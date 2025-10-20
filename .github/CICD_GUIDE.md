# CI/CD DevOps Guide for Mind Sink

This document explains the CI/CD setup for the Mind Sink project using GitHub Actions and Render deployments.

## 🎯 Overview

Our CI/CD pipeline follows a **PR-based workflow** that ensures code quality before merging to production:

1. **Developers create feature branches** from `main`
2. **Open Pull Requests (PRs)** to propose changes
3. **Automated checks run** on every PR (tests, linting, builds)
4. **Code review** by team members
5. **Merge to main** triggers automatic deployment to Render
6. **Production** is updated automatically

## 📋 Prerequisites

### GitHub Setup
- [x] GitHub Pro account (you have this)
- [ ] Repository hosted on GitHub
- [ ] GitHub Actions enabled (enabled by default)

### Render Setup
- [ ] Backend service on Render
- [ ] Frontend service on Render
- [ ] Deploy hooks configured (see setup below)

### Local Development
- Python 3.11+
- Node.js 20+
- Git installed

## 🚀 Initial Setup

### Step 1: Get Render Deploy Hooks

1. Go to your **Render Dashboard**: https://dashboard.render.com
2. Select your **Backend service**
3. Go to **Settings** → **Deploy Hook**
4. Copy the deploy hook URL (looks like: `https://api.render.com/deploy/srv-xxxxx?key=xxxxx`)
5. Repeat for your **Frontend service**

### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `RENDER_BACKEND_DEPLOY_HOOK` | Your backend deploy hook URL from Render |
| `RENDER_FRONTEND_DEPLOY_HOOK` | Your frontend deploy hook URL from Render |

### Step 3: Enable Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add rule** for `main` branch
3. Configure protection:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1 (if working solo, you can skip this)
   - ✅ Require status checks to pass before merging
   - Select required checks:
     - `Backend Tests & Lint`
     - `Frontend Build & Lint`
   - ✅ Require branches to be up to date before merging
4. Save changes

## 🔄 Workflows Explained

### 1. PR Checks (`pr-checks.yml`)
**Triggers:** When you open or update a PR to `main` or `develop`

**What it does:**
- **Backend checks:**
  - Installs Python dependencies
  - Runs flake8 linting (syntax & style)
  - Checks code formatting with black
  - Validates imports work
- **Frontend checks:**
  - Installs npm dependencies
  - Runs ESLint
  - TypeScript type checking
  - Builds the project
  - Uploads build artifacts

**Status:** Must pass before PR can be merged (if branch protection enabled)

### 2. Deploy to Production (`deploy-production.yml`)
**Triggers:** When code is pushed to `main` (i.e., when PR is merged)

**What it does:**
- Triggers backend deployment on Render via deploy hook
- Waits 30 seconds
- Triggers frontend deployment on Render
- Provides deployment summary

**Manual trigger:** You can also trigger this manually from GitHub Actions tab

### 3. Dependency Checks (`dependency-updates.yml`)
**Triggers:** 
- Every Monday at 9 AM UTC
- Manual trigger from GitHub Actions

**What it does:**
- Checks Python dependencies for security vulnerabilities (pip-audit)
- Checks npm packages for vulnerabilities
- Lists outdated packages

### 4. Code Quality (`code-quality.yml`)
**Triggers:** On every PR

**What it does:**
- Runs GitHub CodeQL security analysis
- Scans for TODO/FIXME comments

## 🌿 Development Workflow

### Creating a New Feature

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull origin main

# 2. Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes: git checkout -b fix/bug-description

# 3. Make your changes
# ... edit code ...

# 4. Commit changes
git add .
git commit -m "feat: add your feature description"

# 5. Push to GitHub
git push origin feature/your-feature-name
```

### Opening a Pull Request

1. Go to your GitHub repository
2. Click **Pull Requests** → **New pull request**
3. Select your feature branch
4. Fill out the PR template (auto-populated)
5. Click **Create pull request**
6. Wait for CI checks to complete (usually 2-5 minutes)
7. Review the check results

### Merging and Deployment

1. Once checks pass and code is reviewed:
   - Click **Merge pull request**
   - Confirm merge
2. GitHub Actions automatically triggers deployment
3. Monitor deployment in **Actions** tab
4. Check Render dashboard for deployment status
5. Verify changes on production site

## 🔍 Monitoring CI/CD

### GitHub Actions Tab
- View all workflow runs
- Check logs for failed jobs
- Re-run failed workflows
- Manually trigger deployments

### Render Dashboard
- View deployment logs
- Monitor service health
- Check environment variables

## 📝 Commit Message Convention

Use conventional commits for better changelog generation:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve OAuth redirect issue"
git commit -m "docs: update API documentation"
```

## 🆘 Troubleshooting

### PR Checks Failing

**Backend linting errors:**
```bash
# Run locally to see errors
cd backend
flake8 . --max-line-length=120

# Auto-fix formatting
black .
```

**Frontend build errors:**
```bash
# Run locally
cd frontend
npm run lint
npm run build
```

**Type errors:**
```bash
cd frontend
npx tsc --noEmit
```

### Deployment Failing

1. Check GitHub Actions logs for errors
2. Verify Render deploy hooks are correct in GitHub secrets
3. Check Render dashboard for deployment logs
4. Ensure environment variables are set on Render

### Deploy Hook Not Triggering

1. Verify secret names match exactly:
   - `RENDER_BACKEND_DEPLOY_HOOK`
   - `RENDER_FRONTEND_DEPLOY_HOOK`
2. Check deploy hook URL format (should start with `https://api.render.com/deploy/`)
3. Test deploy hook manually:
   ```bash
   curl -X POST "YOUR_DEPLOY_HOOK_URL"
   ```

## 🎓 Best Practices

1. **Always work in feature branches** - Never commit directly to `main`
2. **Keep PRs small** - Easier to review and less likely to have conflicts
3. **Write descriptive PR titles** - Helps with project history
4. **Test locally first** - Run `npm run build` and backend checks before pushing
5. **Review your own PR** - Check the diff before requesting review
6. **Delete merged branches** - Keep repository clean
7. **Monitor deployment** - Check Actions tab after merge

## 🔐 Security Notes

- Never commit `.env` files or secrets
- Deploy hooks are sensitive - keep them in GitHub secrets only
- Regularly update dependencies (weekly check runs automatically)
- Review security alerts from CodeQL

## 📊 Metrics & Insights

With GitHub Pro, you have access to:
- **Insights** → **Actions** - View workflow statistics
- **Dependency graph** - Track dependencies
- **Security** → **Code scanning** - CodeQL results
- **Pull requests** - Review times and merge statistics

## 🚦 Quick Reference

| Action | Command |
|--------|---------|
| Create feature branch | `git checkout -b feature/name` |
| Run backend lint | `cd backend && flake8 .` |
| Run frontend lint | `cd frontend && npm run lint` |
| Build frontend | `cd frontend && npm run build` |
| Format backend code | `cd backend && black .` |
| Check types | `cd frontend && npx tsc --noEmit` |
| Manual deploy | Go to Actions → Deploy to Production → Run workflow |

## 📞 Getting Help

- Check workflow logs in GitHub Actions tab
- Review Render deployment logs
- Check this documentation
- Review workflow YAML files in `.github/workflows/`

---

**Last Updated:** October 2025  
**Maintained by:** Mind Sink Team
