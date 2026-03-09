---
name: git-commits
description: >
  Git commit convention with automatic emoji injection via Husky.
  Trigger: When making commits, writing commit messages, or explaining the conventional commit format used in this project.
metadata:
  author: jasvdev
  version: '1.0'
---

## When to Use

- Writing or suggesting a git commit message
- Explaining what commit types are available
- Understanding what emoji will be auto-injected
- Validating that a commit message follows the project convention

---

## How It Works

This project uses **Conventional Commits** with **automatic emoji injection** via Husky hooks:

| Hook                 | File           | Responsibility                            |
| -------------------- | -------------- | ----------------------------------------- |
| `prepare-commit-msg` | `add-emoji.js` | Injects emoji after the `:` based on type |
| `commit-msg`         | commitlint     | Validates message format and type         |
| `pre-commit`         | lint-staged    | Runs ESLint + Prettier on staged files    |

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

Examples:
feat(auth): add login form
fix(api): resolve timeout on retry
docs(readme): update setup instructions
```

> ⚠️ Do NOT manually add emoji — the hook inserts it automatically.
> If the message already starts with `:emoji:` after the colon, the hook skips injection.

---

## Emoji Map

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

## Commit Types Reference

### `feat` — New feature

```bash
git commit -m "feat: add user dashboard"
git commit -m "feat(auth): add OAuth with Google"
# Result: feat(auth): :sparkles: add oauth with google
```

### `fix` — Bug fix

```bash
git commit -m "fix: resolve null pointer on login"
git commit -m "fix(api): handle 429 rate limit response"
# Result: fix(api): :bug: handle 429 rate limit response
```

### `refactor` — Code refactor (no behavior change)

```bash
git commit -m "refactor(store): extract reducer into separate file"
# Result: refactor(store): :recycle: extract reducer into separate file
```

### `test` — Add or update tests

```bash
git commit -m "test(auth): add unit tests for login service"
# Result: test(auth): :white_check_mark: add unit tests for login service
```

### `docs` — Documentation only

```bash
git commit -m "docs: update readme with setup guide"
# Result: docs: :memo: update readme with setup guide
```

### `chore` — Maintenance (no production code change)

```bash
git commit -m "chore: update dependencies"
git commit -m "chore(lint): disable rule for test files"
# Result: chore(lint): :wrench: disable rule for test files
```

### `style` — Formatting, no logic change

```bash
git commit -m "style: run prettier on all files"
# Result: style: :lipstick: run prettier on all files
```

### `build` — Build system or dependencies

```bash
git commit -m "build: upgrade typescript to 5.9"
git commit -m "build(deps): add zod for validation"
# Result: build(deps): :package: add zod for validation
```

### `ci` — CI/CD configuration

```bash
git commit -m "ci: add github actions workflow"
# Result: ci: :construction_worker: add github actions workflow
```

### `perf` — Performance improvement

```bash
git commit -m "perf(cache): add redis cache for api responses"
# Result: perf(cache): :zap: add redis cache for api responses
```

### `revert` — Revert a previous commit

```bash
git commit -m "revert: undo feat(auth): add oauth"
# Result: revert: :rewind: undo feat(auth): add oauth
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
feat: add user authentication
fix(api): resolve timeout error
refactor(store): split bears store into modules
test(auth): add integration tests for login
```

### ❌ Invalid messages (commitlint will REJECT)

```
Add login form           ← missing type
FEAT: add login          ← type must be lowercase
feat: Add Login Form     ← subject must be lowercase
update: fix stuff        ← "update" is not a valid type
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

### `emoji-map.js`

```js
export const emojiMap = {
  feat: ':sparkles:',
  fix: ':bug:',
  docs: ':memo:',
  style: ':lipstick:',
  refactor: ':recycle:',
  perf: ':zap:',
  test: ':white_check_mark:',
  build: ':package:',
  ci: ':construction_worker:',
  chore: ':wrench:',
  revert: ':rewind:',
};
```

### `add-emoji.js` logic summary

1. Reads the commit message file (`$1`)
2. Skips if message starts with `#` (git comment)
3. Matches pattern: `type(scope): subject` or `type: subject`
4. Skips if subject already starts with `:emoji:`
5. Looks up emoji in `emojiMap` by type
6. Rewrites message as: `type(scope): :emoji: subject`
