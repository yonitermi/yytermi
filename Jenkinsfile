pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY = credentials('yytermi_aws') // AWS credentials ID in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Infrastructure with Terraform') {
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
                            terraform apply -auto-approve
                            '''
                        }
                    }
                }
            }
        }

        stage('Refresh Terraform State') {
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
                            terraform refresh
                            '''
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the React Docker image
                    sh '''
                    docker build -t yytermi_react:latest ./yytermi_react
                    '''
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    // Fetch the ECR repository URI from Terraform outputs
                    def ecrRepoUri = sh(
                        script: "terraform output -raw ecr_repository_uri -no-color",
                        returnStdout: true
                    ).trim()

                    echo "ECR Repository URI: ${ecrRepoUri}"

                    // Login to ECR and push the Docker image
                    sh """
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ecrRepoUri}
                    docker tag yytermi_react:latest ${ecrRepoUri}:latest
                    docker push ${ecrRepoUri}:latest
                    """
                }
            }
        }

        stage('Update Docker Compose Image') {
            steps {
                script {
                    // Fetch the ECR repository URI from Terraform outputs
                    def ecrRepoUri = sh(
                        script: "terraform output -raw ecr_repository_uri -no-color",
                        returnStdout: true
                    ).trim()

                    // Replace the placeholder in docker-compose.yml with the ECR image URL
                    sh """
                    sed -i 's|\\${REACT_IMAGE_URL}|${ecrRepoUri}:latest|' docker-compose.yml
                    """
                }
            }
        }

        stage('Push Configuration Files to EC2') {
            steps {
                script {
                    // Fetch public IP from Terraform outputs
                    def publicIP = sh(
                        script: "terraform output -raw public_ip -no-color",
                        returnStdout: true
                    ).trim()

                    // Sync necessary files to the EC2 instance
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${publicIP} '
                    mkdir -p /home/ubuntu/yytermi
                    '
                    rsync -avz -e "ssh -i temp_key.pem -o StrictHostKeyChecking=no" \
                        docker-compose.yml nginx.conf install_Docker.sh \
                        ubuntu@${publicIP}:/home/ubuntu/yytermi/
                    """
                }
            }
        }

        stage('Install Docker/Compose on EC2') {
            steps {
                script {
                    // Fetch public IP from Terraform outputs
                    def publicIP = sh(
                        script: "terraform output -raw public_ip -no-color",
                        returnStdout: true
                    ).trim()

                    // Install Docker and Docker Compose on EC2
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${publicIP} '
                    chmod +x /home/ubuntu/yytermi/install_Docker.sh && /home/ubuntu/yytermi/install_Docker.sh
                    '
                    """
                }
            }
        }

        stage('Run Docker Compose on EC2') {
            steps {
                script {
                    // Fetch public IP from Terraform outputs
                    def publicIP = sh(
                        script: "terraform output -raw public_ip -no-color",
                        returnStdout: true
                    ).trim()

                    // Run Docker Compose to start the containers
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${publicIP} '
                    cd /home/ubuntu/yytermi
                    docker-compose up -d
                    '
                    """
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
