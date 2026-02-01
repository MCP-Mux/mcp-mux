# McpMux Development Environment Setup
# Run once after cloning the repo

param(
    [switch]$SkipRust,
    [switch]$SkipNode,
    [switch]$SkipPlaywright,
    [switch]$SkipTauriDriver
)

Write-Host "=== McpMux Dev Setup ===" -ForegroundColor Cyan

# Check prerequisites
Write-Host "`nChecking prerequisites..." -ForegroundColor Yellow

$hasNode = $null -ne (Get-Command "node" -ErrorAction SilentlyContinue)
$hasPnpm = $null -ne (Get-Command "pnpm" -ErrorAction SilentlyContinue)
$hasCargo = $null -ne (Get-Command "cargo" -ErrorAction SilentlyContinue)

if (-not $hasNode) { Write-Host "  Missing: Node.js (https://nodejs.org/)" -ForegroundColor Red }
if (-not $hasPnpm) { Write-Host "  Missing: pnpm (npm install -g pnpm)" -ForegroundColor Red }
if (-not $hasCargo) { Write-Host "  Missing: Rust (https://rustup.rs/)" -ForegroundColor Red }

if (-not ($hasNode -and $hasPnpm -and $hasCargo)) {
    Write-Host "`nPlease install the missing tools and run this script again." -ForegroundColor Red
    exit 1
}

Write-Host "  Node.js: $(node --version)" -ForegroundColor Green
Write-Host "  pnpm: $(pnpm --version)" -ForegroundColor Green
Write-Host "  Rust: $(rustc --version)" -ForegroundColor Green

# Install Node dependencies
if (-not $SkipNode) {
    Write-Host "`nInstalling Node dependencies..." -ForegroundColor Yellow
    pnpm install
    Write-Host "  Done" -ForegroundColor Green
}

# Install Playwright browsers using npx (more compatible)
if (-not $SkipPlaywright) {
    Write-Host "`nInstalling Playwright browsers..." -ForegroundColor Yellow
    npx playwright install chromium
    Write-Host "  Done" -ForegroundColor Green
}

# Install tauri-driver for full E2E tests
if (-not $SkipTauriDriver) {
    Write-Host "`nInstalling tauri-driver..." -ForegroundColor Yellow
    cargo install tauri-driver --locked
    Write-Host "  Done" -ForegroundColor Green
}

# Install cargo-nextest for faster Rust tests
if (-not $SkipRust) {
    Write-Host "`nInstalling cargo-nextest..." -ForegroundColor Yellow
    cargo install cargo-nextest --locked
    Write-Host "  Done" -ForegroundColor Green
}

Write-Host "`n=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now run:"
Write-Host "  pnpm dev           - Start development server"
Write-Host "  pnpm test          - Run all tests"
Write-Host "  pnpm test:e2e:web  - Run web E2E tests (Playwright)"
Write-Host "  pnpm test:e2e      - Run full Tauri E2E tests (requires built app)"
Write-Host ""
