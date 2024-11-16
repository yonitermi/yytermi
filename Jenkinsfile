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
                            sh """
                            export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                            export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                            terraform init -input=false
                            terraform apply -target=tls_private_key.ec2_key \
                                            -target=aws_key_pair.yytermi_key_pair \
                                            -target=aws_security_group.yytermi_security_group \
                                            -target=aws_eip.yytermi_static_ip \
                                            -auto-approve
                            """
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
                            sh """
                            export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                            export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                            terraform apply -target=aws_instance.yytermi_ubuntu_server \
                                            -target=aws_eip_association.yytermi_eip_attach \
                                            -auto-approve
                            """
                        }
                    }
                }
            }
        }
        
        stage('Push Code to EC2') {
            steps {
                withCredentials([file(credentialsId: 'env_file', variable: 'ENV_FILE')]) {
                    script {
                        // Push required files to the EC2 instance
                        sh """
                        scp -i temp_key.pem -o StrictHostKeyChecking=no docker-compose.yml ubuntu@${env.PUBLIC_IP}:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no nginx.conf ubuntu@${env.PUBLIC_IP}:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no install_Docker.sh ubuntu@${env.PUBLIC_IP}:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no $ENV_FILE ubuntu@${env.PUBLIC_IP}:/home/ubuntu/yytermi/.env
                        """
                    }
                }
            }
        }

        stage('Install Docker on EC2') {
            steps {
                script {
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${env.PUBLIC_IP} 'chmod +x /home/ubuntu/yytermi/install_Docker.sh && /home/ubuntu/yytermi/install_Docker.sh'
                    """
                }
            }
        }

        stage('Deploy Containers with Docker Compose') {
            steps {
                script {
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${env.PUBLIC_IP} 'cd /home/ubuntu/yytermi && docker-compose up -d'
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
