import { readFile, writeFile } from 'fs/promises';
import {
  TPL_CODE_CONTACT,
  TPL_DESCRIPTION,
  TPL_EXPERIENCE,
  TPL_HEADER,
  TPL_SKILL,
  TPL_CERTIFICATIONS,
} from './templates.js';

// Constantes del template
const HEADER = '{{header}}';
const DESCRIPTION = '{{description}}';
const CODE_CONTACT = '{{code_contact}}';
const EXPERIENCE = '{{experience}}';
const SKILLS = '{{skills}}';
const CERTIFICATIONS = '{{certifications}}';

// Lectura template
const fileTemplate = await readFile('./README.tpl.md', 'utf-8');

// Escritura del nuevo archivo
const newReadme = fileTemplate
  .replace(HEADER, TPL_HEADER)
  .replace(DESCRIPTION, TPL_DESCRIPTION)
  .replace(CODE_CONTACT, TPL_CODE_CONTACT)
  .replace(EXPERIENCE, TPL_EXPERIENCE)
  .replace(SKILLS, TPL_SKILL)
  .replace(CERTIFICATIONS, TPL_CERTIFICATIONS);

await writeFile('./README.md', newReadme);
