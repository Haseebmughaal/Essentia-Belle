pipeline {
    agent {
    node {
        label 'built-in'
        customWorkspace 'F:/JenkinsAssignment/Workspace'
    }
}

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Haseebmughaal/Essentia-Belle.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npx --yes npm@12.2.3 ci --no-progress'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run lint'

                powershell '''
                    $env:PORT = "3001"
                    $env:NODE_ENV = "production"
                    $env:TEST_URL = "http://localhost:3001"

                    $server = Start-Process `
                        -FilePath "node.exe" `
                        -ArgumentList "--import", "tsx", "server.ts" `
                        -PassThru `
                        -NoNewWindow

                    try {
                        $ready = $false

                        for ($i = 0; $i -lt 30; $i++) {
                            if ($server.HasExited) {
                                throw "Test server stopped unexpectedly"
                            }

                            try {
                                $response = Invoke-WebRequest `
                                    -Uri $env:TEST_URL `
                                    -UseBasicParsing `
                                    -TimeoutSec 2

                                if ($response.StatusCode -eq 200) {
                                    $ready = $true
                                    break
                                }
                            } catch {
                                Start-Sleep -Seconds 1
                            }
                        }

                        if (-not $ready) {
                            throw "Test server failed to start"
                        }

                        npm.cmd test

                        if ($LASTEXITCODE -ne 0) {
                            throw "Automated tests failed"
                        }
                    }
                    finally {
                        if (-not $server.HasExited) {
                            Stop-Process -Id $server.Id -Force
                        }
                    }
                '''
            }
        }
    }

    post {
        success {
            echo 'Build and automated tests completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}