---
name: git-commits
description: >
  Git commit convention with automatic emoji injection via Husky.
  Trigger: MANDATORY. Always apply when writing any git commit message.
  Never write a commit without following this format, even if not asked.
metadata:
  author: jasvdev
  version: "2.0"
---

## ⚠️ MANDATORY — Always Apply

This skill **MUST** be followed for every single commit in this project.
The agent must **never** suggest or write a commit message that doesn't comply
with this convention, even if the user writes one informally.

> 🚫 **NEVER add emojis manually.** Husky injects them automatically.
> If you add an emoji yourself, the hook will double-inject it.

---

## When to Use

- Writing or suggesting any `git commit -m` command
- Explaining available commit types
- Reviewing or fixing a commit message
- Staging and committing changes

---

## How It Works

**Conventional Commits + automatic emoji injection via Husky hooks:**

| Hook                 | File           | Responsibility                         |
| -------------------- | -------------- | -------------------------------------- |
| `prepare-commit-msg` | `add-emoji.js` | Injects emoji after `:` based on type  |
| `commit-msg`         | commitlint     | Validates format and type              |
| `pre-commit`         | lint-staged    | Runs ESLint + Prettier on staged files |

### Flow

```
git commit -m "feat(auth): add login"
    ↓ prepare-commit-msg hook
    ↓ add-emoji.js reads type → "feat" → ":sparkles:"
    ↓ rewrites message
"feat(auth): :sparkles: add login"
    ↓ commit-msg hook
    ↓ commitlint validates → PASS ✅
    ↓ commit created
```

---

## Commit Format

```
<type>(<scope>): <description in lowercase>
```

- **type** — required, must be one of the valid types below
- **scope** — optional, describes the area of code (e.g., `auth`, `readme`, `api`)
- **description** — required, lowercase, no period at the end

---

## Emoji Map (auto-injected, never write manually)

| Type       | Emoji code              | Visual | Meaning                 |
| ---------- | ----------------------- | ------ | ----------------------- |
| `feat`     | `:sparkles:`            | ✨     | New feature             |
| `fix`      | `:bug:`                 | 🐛     | Bug fix                 |
| `docs`     | `:memo:`                | 📝     | Documentation           |
| `style`    | `:lipstick:`            | 💄     | Styling / formatting    |
| `refactor` | `:recycle:`             | ♻️     | Code refactor           |
| `perf`     | `:zap:`                 | ⚡     | Performance improvement |
| `test`     | `:white_check_mark:`    | ✅     | Tests                   |
| `build`    | `:package:`             | 📦     | Build system / deps     |
| `ci`       | `:construction_worker:` | 👷     | CI configuration        |
| `chore`    | `:wrench:`              | 🔧     | Maintenance tasks       |
| `revert`   | `:rewind:`              | ⏪     | Revert a commit         |

---

## Examples by Type

```bash
# feat — new feature
git commit -m "feat(skills): add supabase badge"
git commit -m "feat(auth): add oauth with google"

# fix — bug fix
git commit -m "fix(readme): correct broken image link"
git commit -m "fix(api): handle 429 rate limit response"

# docs — documentation
git commit -m "docs(readme): update setup instructions"
git commit -m "docs: add agents.md global config"

# refactor — code refactor (no behavior change)
git commit -m "refactor(generate-readme): replace require with readFileSync"

# chore — maintenance
git commit -m "chore: update pnpm lockfile"
git commit -m "chore(deps): upgrade typescript to 5.9"

# build — build system or dependencies
git commit -m "build: add pnpm as package manager"
git commit -m "build(deps): add zod for validation"

# style — formatting only, no logic change
git commit -m "style: run prettier on all files"

# test — add or update tests
git commit -m "test(auth): add unit tests for login service"

# ci — CI/CD changes
git commit -m "ci: add github actions workflow"

# perf — performance improvement
git commit -m "perf(cache): memoize skill badge generation"

# revert — revert a previous commit
git commit -m "revert: undo feat(auth): add oauth"
```

---

## Commitlint Rules

| Rule                | Config                                |
| ------------------- | ------------------------------------- |
| `type-enum`         | Only the types listed above are valid |
| `subject-case`      | Must be `lower-case`                  |
| `header-max-length` | Max 100 characters                    |

### ✅ Valid messages

```
feat(readme): add skills section
fix(api): resolve timeout error
refactor(store): split bears store into modules
docs: update readme with setup guide
chore: update pnpm lockfile
```

### ❌ Invalid (commitlint will REJECT)

```
✨ feat(readme): add skills    ← emoji added manually
Add login form                 ← missing type
FEAT: add login                ← type must be lowercase
feat: Add Login Form           ← subject must be lowercase
update: fix stuff              ← "update" is not a valid type
```

---

## Hooks Source Files

```
.husky/
├── commit-msg          → runs commitlint --edit $1
├── pre-commit          → runs lint-staged
├── prepare-commit-msg  → runs node .husky/add-emoji.js $1
├── add-emoji.js        → emoji injection logic
└── emoji-map.js        → type → emoji mapping
```

---

## Quick Commit Workflow

```bash
# 1. Stage changes
git add .

# 2. Commit following convention (no emojis)
git commit -m "feat(skills): add react query badge"

# 3. Verify the auto-injected result
git log --oneline -1
# → feat(skills): :sparkles: add react query badge
```
