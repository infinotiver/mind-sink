# CI/CD Setup Validation Script
# Run this to check if everything is configured correctly

Write-Host "CI/CD Setup Validator" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check 1: GitHub Workflows
Write-Host "Checking GitHub Workflows..." -ForegroundColor Yellow
$workflows = @(
    ".github/workflows/pr-checks.yml",
    ".github/workflows/deploy-production.yml",
    ".github/workflows/code-quality.yml",
    ".github/workflows/dependency-updates.yml"
)

foreach ($workflow in $workflows) {
    if (Test-Path $workflow) {
        Write-Host "  OK $workflow exists" -ForegroundColor Green
    } else {
        Write-Host "  FAIL $workflow missing" -ForegroundColor Red
        $allGood = $false
    }
}

# Check 2: Documentation
Write-Host ""
Write-Host "Checking Documentation..." -ForegroundColor Yellow
$docs = @(
    ".github/SETUP_CHECKLIST.md",
    ".github/CICD_GUIDE.md",
    ".github/BRANCHING_GUIDE.md",
    ".github/QUICK_REFERENCE.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "  OK $doc exists" -ForegroundColor Green
    } else {
        Write-Host "  FAIL $doc missing" -ForegroundColor Red
        $allGood = $false
    }
}

# Check 3: VS Code Configuration
Write-Host ""
Write-Host "Checking VS Code Configuration..." -ForegroundColor Yellow
$vscodeFiles = @(
    ".vscode/settings.json",
    ".vscode/extensions.json",
    ".vscode/tasks.json"
)

foreach ($file in $vscodeFiles) {
    if (Test-Path $file) {
        Write-Host "  OK $file exists" -ForegroundColor Green
    } else {
        Write-Host "  FAIL $file missing" -ForegroundColor Red
        $allGood = $false
    }
}

# Check 4: Code Quality Configs
Write-Host ""
Write-Host "Checking Code Quality Configs..." -ForegroundColor Yellow
$configs = @(
    "backend/.flake8",
    "backend/pyproject.toml",
    "frontend/.prettierrc"
)

foreach ($config in $configs) {
    if (Test-Path $config) {
        Write-Host "  OK $config exists" -ForegroundColor Green
    } else {
        Write-Host "  FAIL $config missing" -ForegroundColor Red
        $allGood = $false
    }
}

# Check 5: Git Repository
Write-Host ""
Write-Host "Checking Git Configuration..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "  OK Git repository initialized" -ForegroundColor Green
    
    $remote = git remote -v 2>&1
    if ($remote -match "github.com") {
        Write-Host "  OK GitHub remote configured" -ForegroundColor Green
    } else {
        Write-Host "  WARN No GitHub remote found" -ForegroundColor Yellow
        Write-Host "     Add with: git remote add origin your-repo-url" -ForegroundColor Gray
    }
} else {
    Write-Host "  FAIL Not a Git repository" -ForegroundColor Red
    $allGood = $false
}

# Check 6: Dependencies
Write-Host ""
Write-Host "Checking Development Tools..." -ForegroundColor Yellow

# Check Node/npm
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "  OK Node.js installed ($nodeVersion)" -ForegroundColor Green
} else {
    Write-Host "  FAIL Node.js not found" -ForegroundColor Red
    $allGood = $false
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "  OK npm installed ($npmVersion)" -ForegroundColor Green
} else {
    Write-Host "  FAIL npm not found" -ForegroundColor Red
    $allGood = $false
}

# Check Python tools (optional)
try {
    $flake8Result = flake8 --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK flake8 installed" -ForegroundColor Green
    } else {
        Write-Host "  WARN flake8 not found (optional)" -ForegroundColor Yellow
        Write-Host "     Install with: pip install flake8" -ForegroundColor Gray
    }
} catch {
    Write-Host "  WARN flake8 not found (optional)" -ForegroundColor Yellow
    Write-Host "     Install with: pip install flake8" -ForegroundColor Gray
}

try {
    $blackResult = black --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK black installed" -ForegroundColor Green
    } else {
        Write-Host "  WARN black not found (optional)" -ForegroundColor Yellow
        Write-Host "     Install with: pip install black" -ForegroundColor Gray
    }
} catch {
    Write-Host "  WARN black not found (optional)" -ForegroundColor Yellow
    Write-Host "     Install with: pip install black" -ForegroundColor Gray
}

# Check 7: Manual Setup Required
Write-Host ""
Write-Host "Manual Setup Required (Cannot Auto-Check)..." -ForegroundColor Yellow
Write-Host "  WARN GitHub Secrets: RENDER_BACKEND_DEPLOY_HOOK" -ForegroundColor Yellow
Write-Host "  WARN GitHub Secrets: RENDER_FRONTEND_DEPLOY_HOOK" -ForegroundColor Yellow
Write-Host "  WARN Branch Protection Rules on main" -ForegroundColor Yellow
Write-Host "     See .github/SETUP_CHECKLIST.md for instructions" -ForegroundColor Gray

# Summary
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "SUCCESS: Local Setup Complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Add GitHub Secrets (see .github/SETUP_CHECKLIST.md)" -ForegroundColor White
    Write-Host "  2. Enable Branch Protection" -ForegroundColor White
    Write-Host "  3. Create a test PR to verify CI/CD" -ForegroundColor White
    Write-Host ""
    Write-Host "Full instructions: .github/SETUP_COMPLETE.md" -ForegroundColor Gray
} else {
    Write-Host "WARNING: Some issues found - see messages above" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Run this script again after fixing issues." -ForegroundColor Gray
}
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
