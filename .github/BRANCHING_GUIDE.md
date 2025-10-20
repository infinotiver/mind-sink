# Mind Sink - Project Branches

## Branch Strategy

We use a simplified Git Flow for this project:

### Main Branches

- **`main`** - Production branch
  - Always deployable
  - Protected (requires PR + CI checks)
  - Auto-deploys to Render on merge

- **`develop`** (optional) - Integration branch
  - For staging multiple features
  - Use if you want to test multiple features together before production

### Feature Branches

Create from: `main` (or `develop` if using)

Naming conventions:
- **Features:** `feature/feature-name`
  - Example: `feature/add-dark-mode`
  - Example: `feature/oauth-login`

- **Bug fixes:** `fix/bug-description`
  - Example: `fix/broken-image-upload`
  - Example: `fix/oauth-redirect-error`

- **Hotfixes:** `hotfix/critical-fix`
  - Example: `hotfix/security-patch`
  - Use for urgent production fixes

- **Documentation:** `docs/doc-topic`
  - Example: `docs/update-readme`

- **Refactoring:** `refactor/area-name`
  - Example: `refactor/api-client`

- **Experiments:** `experiment/idea-name`
  - Example: `experiment/new-ui-layout`

## Workflow Commands

### Starting New Work

```powershell
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Start coding!
```

### Saving Work

```powershell
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add description of your feature"

# Push to GitHub
git push origin feature/your-feature-name
```

### Opening Pull Request

1. Go to GitHub repository
2. Click "Pull requests" → "New pull request"
3. Select your branch
4. Fill out PR template
5. Create PR
6. Wait for CI checks
7. Request review if needed

### After PR is Merged

```powershell
# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# Delete local feature branch
git branch -d feature/your-feature-name

# Delete remote branch (if not auto-deleted)
git push origin --delete feature/your-feature-name
```

## Best Practices

1. **Keep branches short-lived** - Merge within a few days
2. **One feature per branch** - Easier to review and revert if needed
3. **Sync frequently** - Rebase on main to avoid conflicts
4. **Write clear commit messages** - Use conventional commits
5. **Test locally before pushing** - Run `pre-commit-checks` task

## Conventional Commits

Format: `<type>: <description>`

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, no code change
- `refactor:` - Code change that neither fixes bug nor adds feature
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add user profile page
fix: resolve OAuth callback error
docs: update CI/CD guide
style: format backend with black
refactor: extract API client helper functions
chore: update dependencies
```

## Syncing with Main

If main gets ahead of your branch:

```powershell
# On your feature branch
git checkout feature/your-feature-name

# Get latest from main
git fetch origin main

# Rebase your work on top of main
git rebase origin/main

# Force push (only on your feature branch!)
git push --force-with-lease origin feature/your-feature-name
```

## Dealing with Conflicts

If you have merge conflicts:

```powershell
# During rebase, conflicts will be marked
# Open conflicted files in VS Code
# Resolve conflicts (VS Code shows nice UI)
# Stage resolved files
git add .

# Continue rebase
git rebase --continue

# Push changes
git push --force-with-lease origin feature/your-feature-name
```

## Emergency Rollback

If production has issues after merge:

```powershell
# On main branch
git checkout main

# Revert the problematic merge commit
git revert -m 1 <merge-commit-hash>

# Push to trigger immediate redeployment
git push origin main
```

## Useful Git Commands

```powershell
# See current branch and status
git status

# See branch list
git branch -a

# See commit history
git log --oneline --graph --all

# See what changed
git diff

# Stash changes temporarily
git stash
git stash pop

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard origin/main
```
