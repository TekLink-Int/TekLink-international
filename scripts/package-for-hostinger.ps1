# package-for-hostinger.ps1
# Run from the project root: .\scripts\package-for-hostinger.ps1
# Produces: deploy/teklink-deploy.zip — upload this to Hostinger file manager

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$deploy = Join-Path $root "deploy"

Write-Host ""
Write-Host "==> Building TekLink..." -ForegroundColor Cyan
Set-Location $root
npm run build

Write-Host ""
Write-Host "==> Assembling deploy folder..." -ForegroundColor Cyan

# Clean previous deploy
if (Test-Path $deploy) { Remove-Item $deploy -Recurse -Force }
New-Item -ItemType Directory -Path $deploy | Out-Null

# 1. Copy standalone server (includes minimal node_modules)
Copy-Item -Path (Join-Path $root ".next\standalone\*") -Destination $deploy -Recurse -Force

# 2. Copy static assets into the right place inside standalone
$staticDest = Join-Path $deploy ".next\static"
New-Item -ItemType Directory -Path $staticDest -Force | Out-Null
Copy-Item -Path (Join-Path $root ".next\static\*") -Destination $staticDest -Recurse -Force

# 3. Copy public folder
$publicDest = Join-Path $deploy "public"
New-Item -ItemType Directory -Path $publicDest -Force | Out-Null
Copy-Item -Path (Join-Path $root "public\*") -Destination $publicDest -Recurse -Force

Write-Host ""
Write-Host "==> Zipping..." -ForegroundColor Cyan
$zip = Join-Path $root "teklink-deploy.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path (Join-Path $deploy "*") -DestinationPath $zip

Write-Host ""
Write-Host "==> Done!" -ForegroundColor Green
Write-Host "    Upload this file to Hostinger:" -ForegroundColor White
Write-Host "    $(Join-Path $root 'teklink-deploy.zip')" -ForegroundColor Yellow
Write-Host ""
Write-Host "    Hostinger settings:" -ForegroundColor White
Write-Host "    - Startup file:  server.js" -ForegroundColor Gray
Write-Host "    - Node version:  18 or higher" -ForegroundColor Gray
Write-Host "    - Add your .env variables in the Hostinger control panel" -ForegroundColor Gray
Write-Host ""
