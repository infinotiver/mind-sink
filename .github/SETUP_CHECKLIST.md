# CI/CD Quick Start Checklist

Follow these steps to get your CI/CD pipeline running:

## ✅ Step 1: Get Render Deploy Hooks

- [ ] Log into Render: https://dashboard.render.com
- [ ] Go to your **backend service** → Settings → Deploy Hook → Copy URL
- [ ] Go to your **frontend service** → Settings → Deploy Hook → Copy URL

## ✅ Step 2: Add GitHub Secrets

- [ ] Go to GitHub repo: Settings → Secrets and variables → Actions
- [ ] Add secret: `RENDER_BACKEND_DEPLOY_HOOK` (paste backend URL)
- [ ] Add secret: `RENDER_FRONTEND_DEPLOY_HOOK` (paste frontend URL)

## ✅ Step 3: Install Development Tools (Optional but Recommended)

```powershell
# Install Python linting tools
pip install flake8 black pytest pytest-asyncio

# Verify tools work
flake8 --version
black --version
```

## ✅ Step 4: Test the Workflow

Try creating your first PR:

```powershell
# Create a test branch
git checkout -b test/ci-setup

# Make a small change (e.g., add a comment to README)
echo "# CI/CD is now active!" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify CI/CD pipeline"
git push origin test/ci-setup
```

- [ ] Open PR on GitHub
- [ ] Watch CI checks run
- [ ] Verify all checks pass
- [ ] Merge PR
- [ ] Verify auto-deployment triggers

## ✅ Step 5: Enable Branch Protection (After First PR!)

⚠️ **Do this AFTER Step 4** - checks won't appear until workflows run once!

- [ ] Go to GitHub repo: Settings → Branches
- [ ] Add rule for `main` branch:
  - [x] Require pull request before merging
  - [x] Require status checks to pass:
    - Backend Tests & Lint
    - Frontend Build & Lint
  - [x] Require branches to be up to date

## ✅ Step 6: Install VS Code Extensions

Open VS Code and install recommended extensions:

- Press `Ctrl+Shift+P`
- Type: "Extensions: Show Recommended Extensions"
- Click "Install All"

## 📚 Next Steps

- Read full guide: `.github/CICD_GUIDE.md`
- Review workflow files in `.github/workflows/`
- Set up local pre-commit hooks (optional)

## 🎉 You're Done!

Your CI/CD pipeline is now active. Every PR will be checked automatically, and merges to `main` will deploy to production!
