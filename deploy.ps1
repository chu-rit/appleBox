# Build and deploy to docs folder for GitHub Pages

Write-Host "Building web..." -ForegroundColor Cyan
npx expo export --platform web --output-dir docs

# Restore .nojekyll (wiped by expo export)
Write-Host "Creating .nojekyll..." -ForegroundColor Cyan
New-Item -ItemType File -Path "docs\.nojekyll" -Force | Out-Null

# Fix script path in index.html for GitHub Pages /appleBox/ subpath
Write-Host "Fixing index.html script path..." -ForegroundColor Cyan
$html = Get-Content "docs\index.html" -Raw
$fixed = $html -replace 'src="/_expo/', 'src="/appleBox/_expo/'
$fixed = $fixed -replace 'src="_expo/', 'src="/appleBox/_expo/'
Set-Content "docs\index.html" $fixed -NoNewline

Write-Host "Done! docs/ is ready for GitHub Pages." -ForegroundColor Green
