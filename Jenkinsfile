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

        stage('Create AWS Resources') {
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
                        // Clean and create the target directory on the EC2 instance
                        sh '''
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP '
                        sudo rm -rf /home/ubuntu/yytermi/* &&
                        sudo mkdir -p /home/ubuntu/yytermi/ &&
                        sudo chown -R ubuntu:ubuntu /home/ubuntu/yytermi/
                        '
                        '''

                        // Securely transfer files
                        sh '''
                        scp -i temp_key.pem -o StrictHostKeyChecking=no docker-compose.yml ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no nginx.conf ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no install_Docker.sh ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no $ENV_FILE ubuntu@$PUBLIC_IP:/tmp/.env &&
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP '
                        sudo mv /tmp/.env /home/ubuntu/yytermi/.env &&
                        sudo chown ubuntu:ubuntu /home/ubuntu/yytermi/.env
                        '
                        '''
                    }
                }
            }
        }

        
        stage('Install Docker on EC2') {
                steps {
                    script {
                        sh '''
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP 'chmod +x /home/ubuntu/yytermi/install_Docker.sh && /home/ubuntu/yytermi/install_Docker.sh'
                        '''
                    }
                }
            }
        /*
        stage('Deploy Containers with Docker Compose') {
                steps {
                    script {
                        sh '''
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP 'cd /home/ubuntu/yytermi && docker-compose up -d'
                        '''
                    }
                }
            }
        }

    */

    }     

    post {
        always {
            echo 'Cleaning up temporary files...'
            sh 'rm -f temp_key.pem'
        }
    }
}
