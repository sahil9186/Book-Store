pipeline {
agent any

```
tools {
    jdk 'JDK21'
    maven 'Maven3'
}

environment {
    IMAGE_NAME = "bookstore-app"
}

stages {

    stage('Clone') {
        steps {
            git branch: 'main',
                url: 'https://github.com/sahil9186/Book-Store.git'
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

    stage('Build') {
        steps {
            dir('service/bookstore/bookstore') {
                sh 'mvn clean package -DskipTests'
            }
        }
    }

    stage('Verify JAR') {
        steps {
            sh '''
            find . -name "*.jar"
            '''
        }
    }

    stage('Docker Build') {
        steps {
            sh 'docker build -t ${IMAGE_NAME}:latest .'
        }
    }

    stage('Deploy Local') {
        steps {
            sh '''
            docker stop bookstore || true
            docker rm bookstore || true

            docker run -d \
              --name bookstore \
              -p 8080:8080 \
              ${IMAGE_NAME}:latest
            '''
        }
    }
}

post {
    success {
        echo 'Application deployed successfully'
    }

    failure {
        echo 'Pipeline failed'
    }
}
```

}

