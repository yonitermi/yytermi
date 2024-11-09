pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'  // Set your AWS region here
    }

    stages {
        stage('Verify AWS Access') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'yytermi_aws', 
                                  accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                                  secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    script {
                        // Run AWS CLI command to verify access
                        sh """
                        export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                        export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                        export AWS_DEFAULT_REGION=${AWS_REGION}
                        aws sts get-caller-identity
                        """
                    }
                }
            }
        }
    }
}

