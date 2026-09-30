pipeline {
    agent any
    tools { nodejs 'node20' }

    triggers { pollSCM('* * * * *') }

    environment {
        SELENIUM_URL = 'http://selenium:4444'
        APP_URL      = 'http://jenkins:3000'
    }

    stages {
        stage('Install') {
            steps { sh 'npm install' }
        }

        stage('Test') {
            steps {
                sh 'JEST_JUNIT_OUTPUT_NAME=junit-unit.xml npx jest --testPathIgnorePatterns e2e --reporters=default --reporters=jest-junit'
            }
        }

        stage('UI Test') {
            steps {
                sh '''
                    node src/app.js &
                    APP_PID=$!
                    sleep 3
                    JEST_JUNIT_OUTPUT_NAME=junit-ui.xml npx jest tests/e2e --reporters=default --reporters=jest-junit || RESULT=$?
                    kill $APP_PID
                    exit ${RESULT:-0}
                '''
            }
        }
    }

    post {
        always { junit allowEmptyResults: true, testResults: 'junit*.xml' }
    }
}