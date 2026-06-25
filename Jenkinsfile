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
            -p 8081:8080 \
            bookstore-app
            '''
        }
    }
}
