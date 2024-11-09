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
                        // Initialize and apply Terraform from the terraform directory
                        sh """
                        export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                        export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                        cd terraform
                        terraform init
                        terraform apply -auto-approve
                        """
                    }
                }
            }
        }

        stage('Upload and Execute Docker Install Script on EC2') {
            steps {
                script {
                    // Get the public IP of the EC2 instance from the Terraform output
                    def publicIp = sh(script: "cd terraform && terraform output -raw public_ip", returnStdout: true).trim()

                    // Copy the install_Docker.sh script to the EC2 instance
                    sh """
                    scp -o StrictHostKeyChecking=no install_Docker.sh ubuntu@${publicIp}:/home/ubuntu/install_Docker.sh
                    """

                    // SSH into the EC2 instance to set permissions and execute the script
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${publicIp} << 'EOF'
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
            echo 'Pipeline finished!'
        }
    }
}

