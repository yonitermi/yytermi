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

        stage('Terraform Init and Apply') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'yytermi_aws', 
                                  accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                                  secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    script {
                        // Initialize and apply Terraform to create the EC2 instance
                        dir('terraform') {
                            sh """
                            export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                            export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                            terraform init
                            terraform apply -auto-approve
                            """
                        }
                    }
                }
            }
        }

        stage('Retrieve Terraform Outputs') {
            steps {
                script {
                    // Retrieve the EC2 public IP and private key from Terraform outputs
                    dir('terraform') {
                        env.PUBLIC_IP = sh(script: "terraform output -raw public_ip", returnStdout: true).trim()
                        env.PRIVATE_KEY = sh(script: "terraform output -raw private_key_pem", returnStdout: true).trim()
                    }
                }
            }
        }

        stage('Upload and Execute Docker Install Script on EC2') {
            steps {
                script {
                    // Write the private key to a temporary file
                    writeFile file: 'temp_key.pem', text: env.PRIVATE_KEY
                    sh 'chmod 400 temp_key.pem'

                    // Copy the install_Docker.sh script to the EC2 instance
                    sh """
                    scp -i temp_key.pem -o StrictHostKeyChecking=no install_Docker.sh ubuntu@${env.PUBLIC_IP}:/home/ubuntu/install_Docker.sh
                    """

                    // SSH into the EC2 instance to set permissions and execute the script
                    sh """
                    ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${env.PUBLIC_IP} << 'EOF'
                      chmod +x /home/ubuntu/install_Docker.sh
                      /home/ubuntu/install_Docker.sh
                    EOF
                    """
                }
            }
        }
    }

    post {
        always {
            // Clean up the temporary private key file
            sh 'rm -f temp_key.pem'
            echo 'Pipeline finished!'
        }
    }
}

