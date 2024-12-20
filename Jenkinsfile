pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY = credentials('yytermi_aws')  // AWS credentials ID in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('security-groups/keypair/EIP/ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'yytermi_aws', 
                                  accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                                  secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    script {
                        dir('terraform') {
                            sh '''
                            export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                            export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                            terraform init -input=false
                            terraform apply -target=tls_private_key.ec2_key \
                                            -target=aws_key_pair.yytermi_key_pair \
                                            -target=aws_security_group.yytermi_security_group \
                                            -target=aws_eip.yytermi_static_ip \
                                            -target=aws_ecr_repository.yytermi_react_repo \
                                            -auto-approve
                            '''
                        }
                    }
                }
            }
        }

        stage('Create EC2 Instance') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'yytermi_aws', 
                                  accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                                  secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    script {
                        dir('terraform') {
                            sh '''
                            export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                            export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                            terraform apply -target=aws_instance.yytermi_ubuntu_server \
                                            -target=aws_eip_association.yytermi_eip_attach \
                                            -auto-approve
                            '''
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {  // New Stage: Build Docker Image
            steps {
                script {
                    sh '''
                    docker build -t yytermi_react:latest ./yytermi_react
                    '''
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    // Fetch ECR repository URI from Terraform outputs
                    def ecrRepoUri = sh(
                        script: "terraform output -raw ecr_repository_uri",
                        returnStdout: true
                    ).trim()

                    // Login to ECR and push the Docker image
                    sh """
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ecrRepoUri}
                    docker tag yytermi_react:latest ${ecrRepoUri}:latest
                    docker push ${ecrRepoUri}:latest
                    """
                }
            }
        }

        stage('Update Docker Compose') {
            steps {
                script {
                    // Fetch ECR repository URI from Terraform outputs
                    def ecrRepoUri = sh(
                        script: "terraform output -raw ecr_repository_uri",
                        returnStdout: true
                    ).trim()

                    // Update the docker-compose.yml file with the ECR image URL
                    sh """
                    sed -i 's|\\${REACT_IMAGE_URL}|${ecrRepoUri}:latest|' docker-compose.yml
                    """
                }
            }
        }


        stage('Test SSH Connection') {
            steps {
                script {
                    dir('terraform') {
                        env.PRIVATE_KEY = sh(script: "terraform output -raw private_key_pem", returnStdout: true).trim()
                        env.PUBLIC_IP = sh(script: "terraform output -raw public_ip", returnStdout: true).trim()
                    }

                    // Test SSH connection
                    sh '''
                    echo "$PRIVATE_KEY" > temp_key.pem
                    chmod 400 temp_key.pem
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP echo "SSH Connection Successful"
                    '''
                }
            }
        }

        stage('Push Code to EC2') {
            steps {
                withCredentials([file(credentialsId: 'yytermi_mysql_credential', variable: 'ENV_FILE')]) {
                    script {
                        // Ensure the target folders exist
                        sh '''
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP '
                        if [ ! -d /home/ubuntu/yytermi ]; then
                            echo "Creating yytermi folder..."
                            mkdir -p /home/ubuntu/yytermi
                        fi
                        '
                        '''

                        // Sync only necessary files to the yytermi folder
                        sh '''
                        rsync -avz --checksum -i -e "ssh -i temp_key.pem -o StrictHostKeyChecking=no" \
                            docker-compose.yml nginx.conf install_Docker.sh \
                            ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/
                        '''
                    }
                }
            }
        }

        stage('Install Docker/compose on EC2') {
            steps {
                script {
                    sh '''
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP '
                    chmod +x /home/ubuntu/yytermi/install_Docker.sh && /home/ubuntu/yytermi/install_Docker.sh
                    '
                    '''
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    sh '''
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP '
                    cd /home/ubuntu/yytermi
                    docker-compose up -d
                    '
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up temporary files...'
            sh 'rm -f temp_key.pem'
        }
    }
}
