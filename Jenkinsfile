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


       stage('Docker Build') {
    steps {
        sh 'docker build -t bookstore-app .'
    }
}
        stage('Build') {
    steps {
        dir('service/bookstore/bookstore') {
            sh 'mvn clean package'
        }
    }
}
        stage('Debug') {
    steps {
        sh '''
            pwd
            ls -la
            find . -name pom.xml
        '''
    }
}

        stage('Deploy') {
            steps {
                sshagent(['ec2-key']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@DEPLOYMENT-IP '

                    docker stop bookstore || true
                    docker rm bookstore || true

                    docker rmi bookstore-app || true

                    docker build -t bookstore-app .

                    docker run -d \
                    --name bookstore \
                    -p 8080:8080 \
                    bookstore-app
                    '
                    '''
                }
            }
        }
    }
}
