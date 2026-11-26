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
        timeout(time: 10, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                    $env:TEST_URL = "http://127.0.0.1:3001"

                    $server = Start-Process -FilePath "node.exe" -ArgumentList "--import", "tsx", "server.ts" -PassThru -NoNewWindow

                    try {
                        $ready = $false

                        for ($i = 0; $i -lt 15; $i++) {
                            if ($server.HasExited) {
                                throw "Test server stopped unexpectedly"
                            }

                            node -e "fetch(process.env.TEST_URL, {signal: AbortSignal.timeout(2000)}).then(r => {if (!r.ok) throw new Error('HTTP ' + r.status)}).catch(e => {console.error(e); process.exit(1)})"

                            if ($LASTEXITCODE -eq 0) {
                                $ready = $true
                                break
                            }

                            Start-Sleep -Seconds 2
                        }

                        if (-not $ready) {
                            throw "Test server readiness check failed"
                        }

                        Write-Host "Test server is ready"

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