---
name: refactor-guide
description: helps clean up, modernize, and reorganize code following SOLID principles and Clean Code practices without changing external behavior.
---

# Refactoring Guide Skill

When asked to refactor code, follow these principles:

1. **Preserve Behavior**: Ensure the core functionality remains exactly the same. Only change the internal structure.
2. **Improve Readability**:
   - Rename variables and functions to be intention-revealing.
   - Remove dead code or unnecessary comments.
   - Simplify complex conditionals (e.g., using guard clauses or early returns).
3. **Enhance Modularity**:
   - Break down large "God" functions or components into smaller, single-responsibility units.
   - Extract reusable logic into helper functions or custom hooks.
4. **Apply SOLID Principles (where applicable)**:
   - _Single Responsibility_: Ensure a class/component has only one reason to change.
   - _Open/Closed_: Structure code so it's open for extension but closed for modification.
5. **Modernize Syntax**:
   - Update older syntax patterns to modern equivalents (e.g., using optional chaining `?.`, nullish coalescing `??`, or destructuring).

When providing the refactored code, explicitly point out _what_ you changed and _why_ it improves the code.
