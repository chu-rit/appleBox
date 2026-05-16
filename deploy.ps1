# Build and deploy to docs folder for GitHub Pages
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Building web..." -ForegroundColor Cyan
npx expo export --platform web --output-dir docs

# Restore .nojekyll (wiped by expo export)
Write-Host "Creating .nojekyll..." -ForegroundColor Cyan
New-Item -ItemType File -Path "docs\.nojekyll" -Force | Out-Null

# Fix script path in index.html for GitHub Pages /fruitBox/ subpath
Write-Host "Fixing index.html script path..." -ForegroundColor Cyan
$html = Get-Content "docs\index.html" -Raw
$fixed = $html -replace 'src="/_expo/', 'src="/fruitBox/_expo/'
$fixed = $fixed -replace 'src="_expo/', 'src="/fruitBox/_expo/'
Set-Content "docs\index.html" $fixed -NoNewline

# Fix asset paths in JS bundle (images referenced as /assets/...)
Write-Host "Fixing asset paths in JS bundle..." -ForegroundColor Cyan
$jsFile = Get-ChildItem "docs\_expo\static\js\web\AppEntry-*.js" | Select-Object -First 1
if ($jsFile) {
    $js = [System.IO.File]::ReadAllText($jsFile.FullName)
    $js = $js -replace '"/assets/', '"/fruitBox/assets/'
    $js = $js -replace '"assets/', '"/fruitBox/assets/'
    [System.IO.File]::WriteAllText($jsFile.FullName, $js)
    Write-Host "Fixed: $($jsFile.Name)" -ForegroundColor Yellow
}

Write-Host "Done! docs/ is ready for GitHub Pages." -ForegroundColor Green
