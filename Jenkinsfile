pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = "docker-composeTest.yml" // Path to the testing compose file
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Start Test Environment') {
            steps {
                script {
                    sh '''
                    # Start the containers in detached mode
                    docker-compose -f $DOCKER_COMPOSE_FILE up -d

                    # Wait for services to initialize
                    sleep 15
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh '''
                    # Run a simple test to check if the app is responding
                    curl -I http://localhost:8080 || (echo "Test failed: App not reachable!" && exit 1)
                    '''
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    sh '''
                    # Stop and remove the containers
                    docker-compose -f $DOCKER_COMPOSE_FILE down
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up any dangling Docker resources..."
            sh 'docker system prune -f --volumes'
        }
    }
}
