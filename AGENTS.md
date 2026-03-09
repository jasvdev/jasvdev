# AGENTS.md — Guía de contexto global para el agente

> Este archivo es leído automáticamente por el agente AI al inicio de cada conversación en este repositorio. Define las convenciones, herramientas y reglas que **SIEMPRE** deben seguirse, sin excepción.

---

## 📦 Package Manager

**SIEMPRE usar `pnpm`**. Nunca usar `npm` ni `yarn` en este proyecto.

```bash
# ✅ Correcto
pnpm install
pnpm add <package>
pnpm run <script>
pnpm generate-readme

# ❌ Incorrecto
npm install
yarn add
```

---

## 🌿 Git — Branches

**SIEMPRE leer y aplicar el skill:** `.agents/skills/git-branching/SKILL.md`

### Convención de nombre de rama (OBLIGATORIA)

```
(type)/(dev-name)/(id)=(description)
```

| Campo         | Valor                                 | Ejemplo         |
| ------------- | ------------------------------------- | --------------- |
| `type`        | `feat` / `fix` / `bugfix` / `hotfix`  | `feat`          |
| `dev-name`    | Username de git email (antes del `@`) | `jasabogal`     |
| `id`          | ID del task/ticket                    | `TSK-1`         |
| `description` | kebab-case corto                      | `update-readme` |

**Ejemplo real:** `feat/jasabogal/TSK-1=update-readme`

### Reglas de origen

- `feat`, `fix`, `bugfix` → deben partir de `develop`
- `hotfix` → debe partir de `main`

---

## ✍️ Git — Commits

**SIEMPRE leer y aplicar el skill:** `.agents/skills/git-commits/SKILL.md`

### Formato de commit (OBLIGATORIO)

```
<type>(<scope>): <descripción en lowercase>
```

Los emojis son **inyectados automáticamente por Husky** — **NUNCA** agregar emojis manualmente.

### Tipos válidos

| Tipo       | Emoji | Uso                   |
| ---------- | ----- | --------------------- |
| `feat`     | ✨    | Nueva funcionalidad   |
| `fix`      | 🐛    | Corrección de bug     |
| `docs`     | 📝    | Documentación         |
| `style`    | 💄    | Formato / estilos     |
| `refactor` | ♻️    | Refactorización       |
| `perf`     | ⚡    | Mejora de rendimiento |
| `test`     | ✅    | Tests                 |
| `build`    | 📦    | Build / dependencias  |
| `ci`       | 👷    | CI/CD                 |
| `chore`    | 🔧    | Mantenimiento         |
| `revert`   | ⏪    | Revertir commit       |

### ✅ Válido

```bash
git commit -m "feat(readme): add skills section"
git commit -m "chore: update pnpm lockfile"
```

### ❌ Inválido

```bash
git commit -m "✨ feat(readme): add skills"   ← emoji manual
git commit -m "Update readme"                 ← sin type
git commit -m "FEAT: Add Skills"             ← uppercase
```

---

## 🏗️ Scripts del proyecto

| Script         | Comando                | Descripción                                                     |
| -------------- | ---------------------- | --------------------------------------------------------------- |
| Generar README | `pnpm generate-readme` | Regenera `README.md` desde `readme-template.md` + `skills.json` |
| Convertir PDFs | `pnpm convert-pdfs`    | Convierte certificados PDF a JPG                                |
| Ambos          | `pnpm prepare-assets`  | Ejecuta convert-pdfs y luego generate-readme                    |

> ⚠️ **Si se modifica `readme-template.md` o `src/assets/skills.json`, siempre ejecutar `pnpm generate-readme` después.**

---

## 📁 Estructura clave

```
jasvdev/
├── readme-template.md        ← Plantilla fuente del README
├── README.md                 ← Generado automáticamente, NO editar directo
├── src/
│   ├── assets/
│   │   ├── skills.json       ← Lista de tech skills (badges)
│   │   └── certifications/   ← Certificados por proveedor (jpg)
│   ├── generate-readme.ts    ← Script generador
│   └── convert-pdfs.ts       ← Script conversor
└── .agents/
    └── skills/               ← Skills del agente AI
```

---

## 🔑 Reglas generales para el agente

1. **Leer skills relevantes** antes de ejecutar cualquier acción de git
2. **Usar `pnpm`** para todos los comandos de Node.js
3. **Nunca editar `README.md` directamente** — editar `readme-template.md` y ejecutar `pnpm generate-readme`
4. **Respetar el formato de branches y commits** siempre, aunque no sea explícitamente pedido
5. **Verificar el branch actual** antes de crear uno nuevo
