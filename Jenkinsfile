pipeline {
    agent any

    environment {
        // Replace with your actual credentials ID
        AWS_ACCESS_KEY = credentials('yytermi_aws')  
    }

    stages {
        stage('Verify AWS Access') {
            steps {
                script {
                    // Configure AWS CLI using the Jenkins credentials
                    sh """
                    export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_USR}
                    export AWS_SECRET_ACCESS_KEY=${AWS_ACCESS_KEY_PSW}
                    aws sts get-caller-identity
                    """
                }
            }
        }
    }
}

