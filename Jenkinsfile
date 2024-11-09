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

        stage('Create Key Pair') {
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
                            terraform apply -target=tls_private_key.ec2_key -target=aws_key_pair.yytermi_key_pair -auto-approve
                            """
                        }
                    }
                }
            }
        }

        stage('Create Security Group') {
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
                            terraform apply -target=aws_security_group.yytermi_security_group -auto-approve
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
                            terraform apply -target=aws_instance.yytermi_ubuntu_server -auto-approve
                            """
                        }
                    }
                }
            }
        }

        stage('Retrieve Terraform Outputs') {
            steps {
                script {
                    dir('terraform') {
                        env.PUBLIC_IP = sh(script: "terraform output -raw public_ip", returnStdout: true).trim()
                        env.PRIVATE_KEY = sh(script: "terraform output -raw private_key_pem", returnStdout: true).trim()
                    }
                }
            }
        }

        stage('Wait for EC2 Instance SSH Ready') {
            steps {
                script {
                    writeFile file: 'temp_key.pem', text: env.PRIVATE_KEY
                    sh 'chmod 400 temp_key.pem'

                    def retries = 5
                    def waitTime = 10
                    def success = false

                    for (int i = 0; i < retries; i++) {
                        try {
                            sh """
                            ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${env.PUBLIC_IP} echo 'Instance is ready'
                            """
                            success = true
                            break
                        } catch (Exception e) {
                            echo "SSH connection attempt ${i + 1} failed. Retrying in ${waitTime} seconds..."
                            sleep(waitTime)
                        }
                    }

                    if (!success) {
                        error("Failed to connect to EC2 instance after ${retries} attempts.")
                    }
                }
            }
        }

        stage('Upload and Execute Docker Install Script on EC2') {
            steps {
                script {
                    // Check if Docker is already installed
                    def dockerInstalled = false
                    try {
                        dockerInstalled = sh(script: """
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${env.PUBLIC_IP} 'docker --version || echo "not_installed"'
                        """, returnStdout: true).trim() != "not_installed"
                    } catch (Exception e) {
                        dockerInstalled = false
                    }

                    if (!dockerInstalled) {
                        // Copy the install_Docker.sh script if Docker is not installed
                        sh """
                        scp -i temp_key.pem -o StrictHostKeyChecking=no install_Docker.sh ubuntu@${env.PUBLIC_IP}:/home/ubuntu/install_Docker.sh
                        """

                        // SSH into the EC2 instance to set permissions and execute the script
                        sh """
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${env.PUBLIC_IP} <<EOF
                          chmod +x /home/ubuntu/install_Docker.sh
                          /home/ubuntu/install_Docker.sh
                          sudo reboot
EOF
                        """
                    } else {
                        echo "Docker is already installed on the EC2 instance. Skipping installation."
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'rm -f temp_key.pem'
            echo 'Pipeline finished!'
        }
    }
}

