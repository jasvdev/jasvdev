---
name: git-branching
description: >
  Git branching strategy with branch naming conventions and validation rules.
  Trigger: MANDATORY. Always apply when creating branches, pushing code, or
  performing any git operation. Never skip this skill.
metadata:
  author: jasvdev
  version: "2.0"
---

## ⚠️ MANDATORY — Always Apply

This skill **MUST** be followed every time a branch is created or referenced.
The agent must **never** create a branch without following this convention, even
if not explicitly asked.

---

## When to Use

- Creating a new feature, fix, bugfix, or hotfix branch
- Validating branch naming conventions
- Ensuring correct branch type from correct source branch
- Following git flow patterns with main/develop strategy
- Any `git checkout -b` or `git switch -c` command

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
(type)/(dev-name)/(id)=(description)

Where:
- type:        feat | fix | bugfix | hotfix
- dev-name:    Username extracted from git config email (before @)
- id:          Task/ticket ID (e.g. TSK-1, JIRA-42, BUG-7)
- description: Short kebab-case description (no spaces, no uppercase)
```

### Examples

```bash
feat/jasabogal/TSK-1=add-login-feature
fix/jasabogal/TSK-45=resolve-timeout-error
bugfix/jasabogal/BUG-12=fix-null-pointer
hotfix/jasabogal/HOT-3=critical-security-patch
```

---

## Creating a New Branch — Step-by-Step

1. **Check current branch**

   ```bash
   git branch --show-current
   ```

2. **Validate type matches source**
   - On `develop` → use `feat`, `fix`, or `bugfix`
   - On `main` → use `hotfix`
   - If mismatch → switch to correct branch first and pull latest

3. **Get developer name from git config**

   ```bash
   # Windows PowerShell
   (git config user.email).Split('@')[0]

   # Bash
   git config user.email | cut -d'@' -f1
   ```

4. **Compose branch name** using the format above

5. **Create and switch to branch**

   ```bash
   git checkout -b feat/jasabogal/TSK-1=add-login-feature
   ```

6. **Always pull latest from source before branching**

   ```bash
   git checkout develop && git pull origin develop
   git checkout -b feat/jasabogal/TSK-1=description
   ```

---

## Validation Rules

### ✅ Valid

```bash
# On develop branch
git checkout -b feat/jasabogal/TSK-001=add-auth         # ✅
git checkout -b fix/jasabogal/TSK-045=timeout-fix       # ✅

# On main branch
git checkout -b hotfix/jasabogal/HOT-3=security-patch   # ✅
```

### ❌ Invalid

```bash
git checkout -b feat/jasabogal/TSK-001=add-feature      # ❌ if on main
git checkout -b hotfix/jasabogal/HOT-1=urgent-fix       # ❌ if on develop
git checkout -b feature/update                          # ❌ wrong format
git checkout -b TSK-1-add-login                         # ❌ wrong format
```

---

## Quick Reference Commands

```powershell
# Get current branch
git branch --show-current

# Get dev name (PowerShell)
(git config user.email).Split('@')[0]

# Full example (PowerShell)
$devName = (git config user.email).Split('@')[0]
git checkout -b "feat/$devName/TSK-1=add-auth"

# Verify format
git branch | Select-String -Pattern '^(feat|fix|bugfix|hotfix)/\w+/\w+-\d+=.+'

# Push branch
git push -u origin (git branch --show-current)
```

---

## Integration with Commit Convention

Branches work with the automatic emoji commit system. See `git-commits` skill.

```bash
# Create branch
git checkout -b feat/jasabogal/TSK-1=add-login

# Commit (emojis auto-injected by Husky)
git commit -m "feat(auth): add login component"
# → Stored as: feat(auth): :sparkles: add login component

# Push
git push -u origin feat/jasabogal/TSK-1=add-login
```

---

## Common Scenarios

### Feature Development

```bash
git checkout develop
git pull origin develop
git checkout -b feat/jasabogal/TSK-001=user-authentication
# ... work ...
git push -u origin feat/jasabogal/TSK-001=user-authentication
gh pr create --base develop --title "feat(auth): add user authentication"
```

### Production Hotfix

```bash
git checkout main
git pull origin main
git checkout -b hotfix/jasabogal/HOT-3=security-patch
# ... fix ...
git push -u origin hotfix/jasabogal/HOT-3=security-patch
gh pr create --base main --title "hotfix(security): patch XSS vulnerability"
gh pr create --base develop --title "hotfix(security): patch XSS vulnerability"
```

---

## Resources

- [Git Flow Pattern](https://nvie.com/posts/a-successful-git-branching-model/)
- [Branch Naming Conventions](https://deepsource.io/blog/git-branch-naming-conventions/)
