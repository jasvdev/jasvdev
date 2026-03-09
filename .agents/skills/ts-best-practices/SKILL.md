---
name: ts-best-practices
description: Enforces TypeScript best practices and custom project naming conventions for interfaces, types, and enums.
---

# TypeScript Best Practices Skill

When writing, reviewing, or refactoring TypeScript code in this project, adhere to the following strict guidelines and custom conventions:

## 1. Custom Naming Conventions

The user has specific preferences for naming TypeScript constructs. **Always** follow these rules:

- **Interfaces**: Must always start with the capital letter `I`.
  - _Example_: `ICamelCase`, `IUserProfile`, `IHttpRequest`.
- **Enums**: Must always start with the prefix `en`.
  - _Example_: `enCamelCase`, `enStatus`, `enUserRole`.
- **Types (Type Aliases)**: Must always start with the prefix `ty`.
  - _Example_: `tyCamelCase`, `tyStringOrNumber`, `tyActionPayload`.

## 2. General TypeScript Best Practices

- **Avoid `any`**: Strictly minimize or eliminate the use of `any`. Use `unknown` if the type is truly not known until runtime, and use type narrowing/assertions.
- **Strict Null Checks**: Write code that respects strict null checking. Handle `null` and `undefined` explicitly.
- **Use Utility Types**: Leverage TypeScript utility types (`Partial`, `Pick`, `Omit`, `Record`, etc.) to avoid duplicating type definitions.
- **Type Inference**: Rely on TypeScript's type inference where obvious, but always explicitly type function return parameters and complex objects.
- **Readonly**: Use `readonly` for array and object properties that should not be mutated.

## Enforcement

When reviewing rules, generating types, or refactoring code, proactively correct any deviations from the naming conventions (`I`, `en`, `ty`).
