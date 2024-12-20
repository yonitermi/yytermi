pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY = credentials('yytermi_aws') // AWS credentials for Terraform and Docker
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
                            export TF_IN_AUTOMATION=true
                            terraform init -input=false
                            terraform apply -auto-approve
                            '''
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image for the React application
                    sh '''
                    docker build -t yytermi_react:latest ./yytermi_react
                    '''
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    dir('terraform') {
                        def ecrRepoUri = sh(
                            script: "terraform output -raw ecr_repository_uri -no-color",
                            returnStdout: true
                        ).trim()

                        echo "Using ECR Repository URI: ${ecrRepoUri}"

                        sh """
                        aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ecrRepoUri}
                        docker tag yytermi_react:latest ${ecrRepoUri}:latest
                        docker push ${ecrRepoUri}:latest
                        """
                    }
                }
            }
        }

        stage('Push Project Files to EC2 with rsync') {
            steps {
                script {
                    dir('terraform') {
                        def publicIP = sh(
                            script: "terraform output -raw public_ip -no-color",
                            returnStdout: true
                        ).trim()

                        echo "EC2 Public IP: ${publicIP}"

                        // Ensure the yytermi directory exists on the EC2 instance
                        sh """
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${publicIP} '
                        if [ ! -d /home/ubuntu/yytermi ]; then
                            echo "Directory /home/ubuntu/yytermi does not exist. Creating it now..."
                            mkdir -p /home/ubuntu/yytermi
                        else
                            echo "Directory /home/ubuntu/yytermi already exists."
                        fi
                        '
                        """

                        // Use rsync to push files to the EC2 instance
                        sh """
                        rsync -avz --checksum -i -e "ssh -i temp_key.pem -o StrictHostKeyChecking=no" \
                            ../docker-compose.yml ../nginx.conf ../install_Docker.sh \
                            ubuntu@${publicIP}:/home/ubuntu/yytermi/
                        """
                    }
                }
            }
        }



        stage('Execute install_Docker.sh on EC2') {
            steps {
                script {
                    dir('terraform') {
                        def publicIP = sh(
                            script: "terraform output -raw public_ip -no-color",
                            returnStdout: true
                        ).trim()

                        // SSH into EC2 and execute install_Docker.sh
                        sh """
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${publicIP} '
                        chmod +x /home/ubuntu/yytermi/install_Docker.sh
                        /home/ubuntu/yytermi/install_Docker.sh
                        '
                        """
                    }
                }
            }
        }

        stage('Replace Image URL in docker-compose.yml on EC2') {
            steps {
                script {
                    dir('terraform') {
                        def publicIP = sh(
                            script: "terraform output -raw public_ip -no-color",
                            returnStdout: true
                        ).trim()

                        def ecrRepoUri = sh(
                            script: "terraform output -raw ecr_repository_uri -no-color",
                            returnStdout: true
                        ).trim()

                        echo "Replacing REACT_IMAGE_URL with: ${ecrRepoUri}:latest"

                        // SSH into EC2 and replace the placeholder in docker-compose.yml
                        sh """
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${publicIP} '
                        if grep -q "\\\${REACT_IMAGE_URL}" /home/ubuntu/yytermi/docker-compose.yml; then
                            sed -i "s|\\\${REACT_IMAGE_URL}|${ecrRepoUri}:latest|" /home/ubuntu/yytermi/docker-compose.yml
                            echo "Placeholder replaced successfully."
                        else
                            echo "ERROR: Placeholder \\\${REACT_IMAGE_URL} not found in docker-compose.yml"
                            exit 1
                        fi
                        cat /home/ubuntu/yytermi/docker-compose.yml
                        '
                        """
                    }
                }
            }
        }



        stage('Deploy with Docker Compose on EC2') {
            steps {
                script {
                    dir('terraform') {
                        def publicIP = sh(
                            script: "terraform output -raw public_ip -no-color",
                            returnStdout: true
                        ).trim()

                        def ecrRepoUri = sh(
                            script: "terraform output -raw ecr_repository_uri -no-color",
                            returnStdout: true
                        ).trim()

                        // SSH into EC2, authenticate with ECR, and deploy with Docker Compose
                        sh """
                        ssh -i temp_key.pem -o StrictHostKeyChecking=no ubuntu@${publicIP} '
                        echo "Logging into ECR..."
                        aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ecrRepoUri}
                        echo "Starting Docker Compose..."
                        cd /home/ubuntu/yytermi
                        docker-compose up -d
                        '
                        """
                    }
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
