Write-Host "Installing Chocolatey"
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 
Write-Host "Install NodeJs"
cinst nodejs.install -y
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 
Write-Host "Node Version :"
node --version
Write-Host "Npm Version :"
npm -v
Write-Host "Installing http-server packages : "
cd $PSScriptRoot\kvs-rc-actor-state-migration-viewer
Write-Host (Get-Location).path
npm install http-server
