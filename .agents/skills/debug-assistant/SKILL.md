---
name: debug-assistant
description: provides a structured workflow for identifying, analyzing, and resolving software bugs or errors.
---

# Debug Assistant Skill

When helping a user debug an issue, follow this systematic approach:

1. **Symptom Collection**:
   - Ask for or analyze the exact error message, stack trace, and steps to reproduce.
   - Identify the expected behavior vs. the actual behavior.

2. **Hypothesis Generation**:
   - Formulate 1-3 likely causes for the bug based on the symptoms and context.

3. **Investigation Strategy**:
   - Suggest specific places in the code to check (e.g., specific files, functions, or variables).
   - Recommend commands or log statements that would help isolate the issue (e.g., "Add `console.log(variable)` here").

4. **Solution Proposal**:
   - Once the issue is identified, provide a clear, step-by-step fix.
   - Include the corrected code snippet.
   - Explain _why_ the fix works.

5. **Prevention**:
   - Suggest how to prevent this class of bug in the future (e.g., adding a specific type, writing a test case, or changing a configuration).
