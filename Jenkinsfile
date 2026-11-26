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

    triggers {
        pollSCM('* * * * *')
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

                            node -e "fetch(process.env.TEST_URL, {signal: AbortSignal.timeout(2000)}).then(r => {if (!r.ok) process.exit(1)}).catch(() => process.exit(1))"

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

        stage('Deploy') {
            steps {
                powershell '''
                    $ErrorActionPreference = "Stop"

                    $deploy = "F:/JenkinsAssignment/Deployment"
                    $pidFile = Join-Path $deploy "server.pid"

                    New-Item -ItemType Directory -Path $deploy -Force | Out-Null

                    # Stop the previous deployed server
                    if (Test-Path $pidFile) {
                        $oldId = [int](Get-Content $pidFile)
                        $oldServer = Get-CimInstance Win32_Process -Filter "ProcessId=$oldId"

                        if ($oldServer) {
                            if ($oldServer.Name -ne "node.exe" -or $oldServer.CommandLine -notlike "*Deployment/server.ts*") {
                                throw "Stored PID does not match the deployed server"
                            }

                            Stop-Process -Id $oldId -Force
                            Wait-Process -Id $oldId -Timeout 10 -ErrorAction SilentlyContinue
                        }

                        Remove-Item $pidFile
                    }

                    if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) {
                        throw "Deployment port 3000 is occupied"
                    }

                    # Copy production files
                    robocopy dist "$deploy/dist" /MIR /NFL /NDL /NJH /NJS /NP
                    if ($LASTEXITCODE -ge 8) {
                        throw "Production build copy failed"
                    }

                    robocopy node_modules "$deploy/node_modules" /MIR /NFL /NDL /NJH /NJS /NP
                    if ($LASTEXITCODE -ge 8) {
                        throw "Dependency copy failed"
                    }

                    Copy-Item server.ts, package.json, package-lock.json -Destination $deploy -Force

                    # Preserve the existing deployed database
                    if (-not (Test-Path "$deploy/boutique.db")) {
                        Copy-Item boutique.db -Destination $deploy
                    }

                    # Keep the deployed process running after Jenkins finishes
                    $env:JENKINS_NODE_COOKIE = "EssentiaBelleDeployment"
                    $env:NODE_ENV = "production"
                    $env:PORT = "3000"
                    $env:TEST_URL = "http://127.0.0.1:3000"

                    $server = Start-Process -FilePath "node.exe" `
                        -ArgumentList "--import", "tsx", "$deploy/server.ts" `
                        -WorkingDirectory $deploy `
                        -RedirectStandardOutput "$deploy/server.log" `
                        -RedirectStandardError "$deploy/server-error.log" `
                        -WindowStyle Hidden `
                        -PassThru

                    $server.Id | Set-Content $pidFile

                    # Verify deployed website and API
                    $ready = $false

                    for ($i = 0; $i -lt 15; $i++) {
                        if ($server.HasExited) {
                            break
                        }

                        node -e "Promise.all([fetch(process.env.TEST_URL),fetch(process.env.TEST_URL+'/api/products')]).then(async ([a,b])=>{if(!a.ok||!b.ok||!Array.isArray(await b.json()))process.exit(1)}).catch(()=>process.exit(1))"

                        if ($LASTEXITCODE -eq 0) {
                            $ready = $true
                            break
                        }

                        Start-Sleep -Seconds 2
                    }

                    if (-not $ready) {
                        Get-Content "$deploy/server-error.log" -ErrorAction SilentlyContinue

                        if (-not $server.HasExited) {
                            Stop-Process -Id $server.Id -Force
                        }

                        Remove-Item $pidFile -ErrorAction SilentlyContinue
                        throw "Deployment verification failed"
                    }

                    Write-Host "Deployment successful!"
                    Write-Host "Website: http://localhost:3000"
                    exit 0
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
            echo 'Website deployed at http://localhost:3000'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}