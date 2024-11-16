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

        stage('Connect to EC2') {
            steps {
                script {
                    dir('terraform') {
                        // Retrieve the private key and Elastic IP from Terraform outputs
                        env.PRIVATE_KEY = sh(script: "terraform output -raw private_key_pem", returnStdout: true).trim()
                        env.PUBLIC_IP = sh(script: "terraform output -raw public_ip", returnStdout: true).trim()
                    }

                    // Use bash for the SSH command
                    sh '''
                    #!/bin/bash
                    echo "Connecting to EC2 instance at $PUBLIC_IP..."
                    ssh -o StrictHostKeyChecking=no -i <(echo "$PRIVATE_KEY") ubuntu@$PUBLIC_IP echo "Connection successful!"
                    '''
                }
            }
        }


        /*
        stage('Push Code to EC2') {
            steps {
                withCredentials([file(credentialsId: 'yytermi_mysql_credential', variable: 'ENV_FILE')]) {
                    script {
                        // Debug SSH key and Elastic IP
                        sh '''
                        echo "Checking temp_key.pem:"
                        ls -l temp_key.pem
                        echo "Testing SSH connection:"
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP echo "SSH Connection Successful"
                        '''

                        // Securely transfer files
                        sh '''
                        scp -i temp_key.pem -o StrictHostKeyChecking=no docker-compose.yml ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no nginx.conf ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no install_Docker.sh ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/
                        scp -i temp_key.pem -o StrictHostKeyChecking=no $ENV_FILE ubuntu@$PUBLIC_IP:/home/ubuntu/yytermi/.env
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
