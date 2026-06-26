pipeline {

    agent any

    tools {
        jdk 'JDK21'
        maven 'Maven3'
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sahil9186/Book-Store.git'
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    rm -rf service/bookstore/bookstore/target || true
                '''
            }
        }

        stage('Build') {
            steps {
                dir('service/bookstore/bookstore') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Verify JAR') {
            steps {
                sh 'find . -name "*.jar"'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t bookstore-app .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop bookstore || true
                docker rm bookstore || true

                docker run -d \
                  --name bookstore \
                  --network bookstore-network \
                  -p 8081:8080 \
                  -e DB_URL="jdbc:mysql://mysql:3306/bookstore" \
                  -e DB_USERNAME="root" \
                  -e DB_PASSWORD="root123" \
                  -e FRONTEND_URL="http://localhost:3000" \
                  bookstore-app
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}
