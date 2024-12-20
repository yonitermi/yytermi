pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yytermi-react"  // Name of the Docker image
        IMAGE_TAG = "latest"           // Image tag
        DOCKERFILE_DIR = "yytermi_react" // Directory containing the Dockerfile
        CONTAINER_NAME = "yytermi-react-container" // Name of the test container
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    # Navigate to the directory containing the Dockerfile
                    cd $DOCKERFILE_DIR

                    # Build the Docker image
                    docker build -t $DOCKER_IMAGE:$IMAGE_TAG .
                    '''
                }
            }
        }

        stage('Run and Test Container') {
            steps {
                script {
                    sh '''
                    # Check if the container exists and remove it if it does
                    docker ps -a -q -f name=$CONTAINER_NAME | grep -q . && docker rm -f $CONTAINER_NAME || true

                    # Run the container
                    docker run --name $CONTAINER_NAME -d -p 3000:3000 $DOCKER_IMAGE:$IMAGE_TAG

                    # Wait for the app to start
                    sleep 45

                    # Test if the app is reachable
                    curl -I http://localhost:3000 || (echo "App is not responding!" && exit 1)
                    '''
                }
            }
        }


        stage('Clean Up') {
            steps {
                script {
                    sh '''
                    # Stop and remove the container
                    docker stop $CONTAINER_NAME
                    docker rm $CONTAINER_NAME
                    '''
                }
            }
        }
    }


    post {
        always {
            echo "Cleaning up any dangling Docker images..."
            sh 'docker image prune -f'
        }
    }
}
