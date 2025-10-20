# 🚀 CI/CD Quick Reference Card

## 📋 Daily Commands

### Starting New Feature

```powershell
git checkout main
git pull origin main
git checkout -b feature/name
```

### Saving Work

```powershell
git add .
git commit -m "feat: description"
git push origin feature/name
```

### Opening PR

1. Go to GitHub → Pull Requests → New
2. Select your branch → Create PR
3. Wait for checks ✅
4. Merge when green

### After Merge

```powershell
git checkout main
git pull origin main
git branch -d feature/name
```

## ⚡ VS Code Tasks

| Task              | Shortcut                      | Action                   |
| ----------------- | ----------------------------- | ------------------------ |
| Run All Tasks     | `Ctrl+Shift+P` → "Run Task"   | See all available tasks  |
| Pre-commit Checks | Run task: `pre-commit-checks` | Lint & format everything |
| Start Dev Servers | Run task: `start-all-dev`     | Start backend + frontend |
| Lint Backend      | Run task: `lint-backend`      | Check Python code        |
| Lint Frontend     | Run task: `lint-frontend`     | Check TypeScript/React   |
| Build Frontend    | `Ctrl+Shift+B`                | Build for production     |

## 🔍 Quick Checks Before Push

```powershell
# In VS Code Terminal
cd backend
flake8 .
black .

cd ../frontend
npm run lint
npm run build
```

## 🎯 Commit Message Format

```
<type>: <description>

Types: feat, fix, docs, style, refactor, test, chore
```

## 📊 GitHub Actions Status

- ✅ Green check = All good, ready to merge
- 🟡 Yellow dot = Running checks, wait...
- ❌ Red X = Failed, click for details

## 🆘 Common Issues

| Problem         | Solution                              |
| --------------- | ------------------------------------- |
| Lint errors     | Run `black backend` or `npm run lint` |
| Type errors     | Run `npx tsc --noEmit` in frontend    |
| Build fails     | Check logs, fix errors, push again    |
| Merge conflicts | Pull main, rebase, resolve conflicts  |

## 🔐 Setup (One-time)

1. Get Render deploy hooks
2. Add to GitHub Secrets:
   - `RENDER_BACKEND_DEPLOY_HOOK`
   - `RENDER_FRONTEND_DEPLOY_HOOK`
3. Enable branch protection on `main`

## 📚 Full Docs

- Setup: `.github/SETUP_CHECKLIST.md`
- Complete Guide: `.github/CICD_GUIDE.md`
- Branching: `.github/BRANCHING_GUIDE.md`

## 🎉 That's It!

Keep PRs small, test locally, watch CI checks, merge confidently!
