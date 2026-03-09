# GitHub Profile README Automation Plan v1

## Objective

Automatically generate `README.md` from `readme-template.md` using `src/assets/skills.json` and `src/assets/certifications/`.

## Decisions (Approved by User)

- **Title**: "Senior Frontend Engineer | Building Scalable Web Experiences"
- **Asset Paths**: Use `src/assets/...` in the generated README.
- **Stats**: Include GitHub stats widget.
- **Conversion**: Use Poppler (`pdftoppm`) in CI to convert PDFs to images.
- **Template**: Renamed `example-readme.md` to `readme-template.md`.

## Scripts to implement

1. `src/rename-certs.ts`: Normalizes file names (spaces to underscores, remove space after commas).
2. `src/convert-pdfs.ts`: CI script to convert PDF certs without JPG counterparts to JPG.
3. `src/generate-readme.ts`: Main script reading template, parsing `skills.json` to shield URLs, scanning `certifications/`, and writing `README.md`.

## Workflow

`.github/workflows/generate-readme.yml` will run the normalization, conversion, and generation scripts on every push to `main` modifying assets or template, then commit the changes.
