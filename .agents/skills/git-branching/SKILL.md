---
name: git-branching
description: >
  Git branching strategy with branch naming conventions and validation rules.
  Trigger: When creating new branches, validating branch types, or following git flow patterns.
metadata:
  author: personal-academy
  version: '1.0'
---

## When to Use

- Creating a new feature, fix, bugfix, or hotfix branch
- Validating branch naming conventions
- Ensuring correct branch type from correct source branch
- Following git flow patterns with main/develop strategy

---

## Branch Strategy

### Main Branches

```
main     → Production branch (only hotfixes)
develop  → Development branch (features, fixes, bugfixes)
```

### Branch Types and Source Validation

| Type     | Source Branch | Purpose                 |
| -------- | ------------- | ----------------------- |
| `feat`   | `develop`     | New features            |
| `fix`    | `develop`     | Bug fixes               |
| `bugfix` | `develop`     | Bug fixes (alternative) |
| `hotfix` | `main`        | Production urgent fixes |

---

## Branch Naming Convention

### Format

```
(type)/name-dev/{id}={description}

Donde:
- type:        feat | fix | bugfix | hotfix
- name-dev:    Username from git config (before @)
- id:          Task/ticket ID
- description: Short kebab-case description
```

### Examples

```bash
# Feature branch
feat/jose123/PA-001=add-login-feature

# Fix branch
fix/maria/PA-045=resolve-timeout-error

# Bugfix branch
bugfix/pedro/BUG-12=fix-null-pointer

# Hotfix branch (from main)
hotfix/carlos/HOT-3=critical-security-patch
```

---

## Creating a New Branch

### Step-by-Step Process

1. **Verify current branch**

   ```bash
   git branch --show-current
   ```

2. **Validate type matches source**
   - If on `develop` → Use `feat`, `fix`, or `bugfix`
   - If on `main` → Use `hotfix`
   - If mismatch → Switch to correct branch first

3. **Get developer name**

   ```bash
   # Extract username from git email
   git config user.email | cut -d'@' -f1
   ```

4. **Ask for task ID and description**
   - Task ID: e.g., `PA-001`, `JIRA-123`, `BUG-45`
   - Description: Short kebab-case, e.g., `add-oauth-login`

5. **Create branch**
   ```bash
   git checkout -b (type)/name-dev/{id}={description}
   ```

---

## Validation Rules

### ✅ Valid Scenarios

```bash
# On develop branch
git checkout develop
git checkout -b feat/jose/PA-001=add-auth
# ✅ Valid: feat from develop

# On develop branch
git checkout develop
git checkout -b fix/maria/PA-045=timeout-fix
# ✅ Valid: fix from develop

# On main branch
git checkout main
git checkout -b hotfix/carlos/HOT-3=security-patch
# ✅ Valid: hotfix from main
```

### ❌ Invalid Scenarios

```bash
# On main branch trying to create feat
git checkout main
git checkout -b feat/jose/PA-001=add-feature
# ❌ Invalid: feat must be from develop

# On develop trying to create hotfix
git checkout develop
git checkout -b hotfix/maria/HOT-1=urgent-fix
# ❌ Invalid: hotfix must be from main
```

---

## Quick Commands

### Get Current Branch

```bash
git branch --show-current
```

### Get Developer Name

```bash
# From email
git config user.email | cut -d'@' -f1

# From name (alternative)
git config user.name | tr '[:upper:]' '[:lower:]' | tr ' ' '-'
```

### Create Branch (Full Command)

```bash
# Example for feature
BRANCH_TYPE="feat"
DEV_NAME=$(git config user.email | cut -d'@' -f1)
TASK_ID="PA-001"
DESCRIPTION="add-login-feature"

git checkout -b "$BRANCH_TYPE/$DEV_NAME/$TASK_ID=$DESCRIPTION"
```

### Verify Branch Name Format

```bash
# Pattern: (type)/(dev)/(id)=(desc)
git branch | grep -E '^(feat|fix|bugfix|hotfix)/[a-z0-9]+/[A-Z]+-[0-9]+=.*$'
```

---

## Interactive Branch Creation Script

```bash
#!/bin/bash

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Get developer name from git config
DEV_NAME=$(git config user.email | cut -d'@' -f1)

echo "Current branch: $CURRENT_BRANCH"
echo "Developer: $DEV_NAME"
echo ""

# Determine allowed types based on current branch
if [ "$CURRENT_BRANCH" = "develop" ]; then
    echo "Allowed types from develop: feat, fix, bugfix"
    echo -n "Select type (feat/fix/bugfix): "
    read BRANCH_TYPE

    if [[ ! "$BRANCH_TYPE" =~ ^(feat|fix|bugfix)$ ]]; then
        echo "❌ Invalid type for develop branch"
        exit 1
    fi
elif [ "$CURRENT_BRANCH" = "main" ]; then
    echo "Allowed type from main: hotfix"
    echo -n "Select type (hotfix): "
    read BRANCH_TYPE

    if [ "$BRANCH_TYPE" != "hotfix" ]; then
        echo "❌ Only hotfix allowed from main"
        exit 1
    fi
else
    echo "❌ Must be on main or develop to create branch"
    exit 1
fi

# Ask for task ID
echo -n "Task ID (e.g., PA-001): "
read TASK_ID

# Ask for description
echo -n "Description (kebab-case, e.g., add-login): "
read DESCRIPTION

# Create branch name
BRANCH_NAME="$BRANCH_TYPE/$DEV_NAME/$TASK_ID=$DESCRIPTION"

echo ""
echo "Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"
```

---

## PowerShell Version (Windows)

```powershell
# Get current branch
$currentBranch = git branch --show-current

# Get developer name
$email = git config user.email
$devName = $email.Split('@')[0]

Write-Host "Current branch: $currentBranch"
Write-Host "Developer: $devName"
Write-Host ""

# Validate and get type
if ($currentBranch -eq "develop") {
    Write-Host "Allowed types: feat, fix, bugfix"
    $branchType = Read-Host "Select type"

    if ($branchType -notin @("feat", "fix", "bugfix")) {
        Write-Host "❌ Invalid type for develop branch" -ForegroundColor Red
        exit 1
    }
} elseif ($currentBranch -eq "main") {
    Write-Host "Allowed type: hotfix"
    $branchType = Read-Host "Select type"

    if ($branchType -ne "hotfix") {
        Write-Host "❌ Only hotfix allowed from main" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Must be on main or develop" -ForegroundColor Red
    exit 1
}

# Get task details
$taskId = Read-Host "Task ID (e.g., PA-001)"
$description = Read-Host "Description (kebab-case)"

# Create branch
$branchName = "$branchType/$devName/$taskId=$description"
Write-Host "`nCreating branch: $branchName" -ForegroundColor Green
git checkout -b $branchName
```

---

## Best Practices

1. **Always start from updated branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/name/id=description
   ```

2. **Use descriptive task IDs**
   - Good: `PA-001`, `JIRA-123`, `BUG-45`
   - Bad: `1`, `task`, `test`

3. **Keep descriptions short and clear**
   - Good: `add-oauth-login`, `fix-timeout-error`
   - Bad: `feature`, `update`, `changes`

4. **Follow kebab-case**
   - Good: `add-user-profile`
   - Bad: `addUserProfile`, `add_user_profile`

5. **Verify before pushing**
   ```bash
   git branch  # Verify name is correct
   git log     # Verify commits follow emoji convention
   git push -u origin $(git branch --show-current)
   ```

---

## Integration with Commit System

Branches work seamlessly with the automatic emoji commit system:

```bash
# Create branch
git checkout -b feat/jose/PA-001=add-login

# Make commits (emojis added automatically)
git commit -m "feat(auth): add login component"
# Result: feat(auth): :sparkles: add login component

git commit -m "test(auth): add login tests"
# Result: test(auth): :white_check_mark: add login tests

# Push branch
git push -u origin feat/jose/PA-001=add-login
```

---

## Common Scenarios

### Feature Development

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feat/jose/PA-001=user-authentication

# 3. Work and commit
git commit -m "feat(auth): add login form"
git commit -m "feat(auth): add OAuth provider"
git commit -m "test(auth): add authentication tests"

# 4. Push
git push -u origin feat/jose/PA-001=user-authentication

# 5. Create PR to develop
gh pr create --base develop --title "feat(auth): add user authentication"
```

### Production Hotfix

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create hotfix branch
git checkout -b hotfix/maria/HOT-3=security-patch

# 3. Fix and commit
git commit -m "fix(security): patch XSS vulnerability"

# 4. Push
git push -u origin hotfix/maria/HOT-3=security-patch

# 5. Create PR to main AND develop
gh pr create --base main --title "hotfix(security): patch XSS vulnerability"
gh pr create --base develop --title "hotfix(security): patch XSS vulnerability"
```

---

## Resources

- [Git Flow Pattern](https://nvie.com/posts/a-successful-git-branching-model/)
- [Branch Naming Conventions](https://deepsource.io/blog/git-branch-naming-conventions/)
