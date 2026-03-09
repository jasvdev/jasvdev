---
name: code-review
description: acts as a first code reviewer before merging PRs or pushing changes. Checks for anti-patterns, security vulnerabilities, performance issues, and adherence to team standards.
---

# Code Review Skill

When asked to perform a code review, follow these guidelines:

1. **Understand Context**: Briefly summarize what the code does or the purpose of the changes.
2. **Identify Anti-Patterns**: Point out any common anti-patterns (e.g., God objects, magic numbers, deeply nested callbacks).
3. **Security Check**: Look for obvious security flaws (e.g., SQL injection risks, XSS, insecure data storage, hardcoded secrets).
4. **Performance Check**: Identify potential performance bottlenecks (e.g., N+1 queries, unnecessary re-renders in UI frameworks, memory leaks).
5. **Team Standards**: Check if the code follows general best practices (e.g., descriptive naming, modularity, DRY principle).
6. **Constructive Feedback**: Provide feedback constructively. Always suggest a concrete way to improve or fix the issue. Include code snippets.
7. **Praise Good Code**: Acknowledge parts of the code that are well-written.
