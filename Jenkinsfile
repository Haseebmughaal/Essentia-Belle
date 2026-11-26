        stage('Deploy') {
            steps {
                powershell '''
                    $ErrorActionPreference = "Stop"

                    $deploy = "F:/JenkinsAssignment/Deployment"
                    $taskName = "EssentiaBelleDeployment"

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
                    robocopy dist "$deploy/dist" /MIR /NFL /NDL /NJH /NJS /NP

                    if ($LASTEXITCODE -ge 8) {
                        throw "Production build copy failed"
                    }

                    # Copy dependencies
                    robocopy node_modules "$deploy/node_modules" /MIR /NFL /NDL /NJH /NJS /NP

                    if ($LASTEXITCODE -ge 8) {
                        throw "Dependency copy failed"
                    }

                    Copy-Item server.ts, package.json, package-lock.json -Destination $deploy -Force

                    # Preserve existing database
                    if (-not (Test-Path "$deploy/boutique.db")) {
                        Copy-Item boutique.db -Destination $deploy
                    }

                    # Create production startup script
                    @"
@echo off
cd /d F:/JenkinsAssignment/Deployment
set NODE_ENV=production
set PORT=3000
"C:/Program Files/nodejs/node.exe" --import tsx server.ts > server.log 2>&1
"@ | Set-Content "$deploy/start-server.cmd" -Encoding ASCII

                    # Configure independent scheduled task
                    $action = New-ScheduledTaskAction `
                        -Execute "cmd.exe" `
                        -Argument "/c F:/JenkinsAssignment/Deployment/start-server.cmd" `
                        -WorkingDirectory $deploy

                    $settings = New-ScheduledTaskSettingsSet `
                        -ExecutionTimeLimit ([TimeSpan]::Zero) `
                        -AllowStartIfOnBatteries `
                        -DontStopIfGoingOnBatteries

                    Register-ScheduledTask `
                        -TaskName $taskName `
                        -Action $action `
                        -Settings $settings `
                        -User "SYSTEM" `
                        -Force | Out-Null

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