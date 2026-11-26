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
                    $taskName = "EssentiaBelleDeployment"

                    New-Item -ItemType Directory -Path $deploy -Force | Out-Null

                    # Stop previous deployment
                    $task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

                    if ($task -and $task.State -eq "Running") {
                        Stop-ScheduledTask -TaskName $taskName
                        Start-Sleep -Seconds 3
                    }

                    if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) {
                        throw "Deployment port 3000 is occupied"
                    }

                    # Copy production build
                    robocopy dist "$deploy/dist" /MIR /R:2 /W:2 /NFL /NDL /NJH /NJS /NP

                    if ($LASTEXITCODE -ge 8) {
                        throw "Production build copy failed"
                    }

                    # Copy dependencies
                    robocopy node_modules "$deploy/node_modules" /MIR /R:2 /W:2 /NFL /NDL /NJH /NJS /NP

                    if ($LASTEXITCODE -ge 8) {
                        throw "Dependency copy failed"
                    }

                    Copy-Item server.ts, package.json, package-lock.json -Destination $deploy -Force

                    # Preserve existing database
                    if (-not (Test-Path "$deploy/boutique.db")) {
                        Copy-Item boutique.db -Destination $deploy
                    }

                    # Configure independent production server
                    $env:NODE_ENV = "production"

                    @("NODE_ENV=production", "PORT=3000") | Set-Content "$deploy/.env.production" -Encoding ASCII

$action = New-ScheduledTaskAction -Execute "C:/Program Files/nodejs/node.exe" -Argument "--import tsx --env-file=.env.production server.ts" -WorkingDirectory $deploy

                    $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

                    Register-ScheduledTask -TaskName $taskName -Action $action -Settings $settings -User "SYSTEM" -Force | Out-Null

                    Start-ScheduledTask -TaskName $taskName

                    # Verify deployed website and API
                    $env:TEST_URL = "http://127.0.0.1:3000"
                    $ready = $false

                    for ($i = 0; $i -lt 15; $i++) {
                        node -e "Promise.all([fetch(process.env.TEST_URL,{signal:AbortSignal.timeout(2000)}),fetch(process.env.TEST_URL+'/api/products',{signal:AbortSignal.timeout(2000)})]).then(async ([a,b])=>{if(!a.ok||!b.ok||!Array.isArray(await b.json()))process.exit(1)}).catch(()=>process.exit(1))"

                        if ($LASTEXITCODE -eq 0) {
                            $ready = $true
                            break
                        }

                        Start-Sleep -Seconds 2
                    }

                    if (-not $ready) {
                        Get-Content "$deploy/server.log" -ErrorAction SilentlyContinue
                        Stop-ScheduledTask -TaskName $taskName
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

        aborted {
            echo 'Pipeline aborted. Check the console output.'
        }
    }
}