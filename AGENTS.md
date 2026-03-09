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

---

## ✍️ Git — Commits

**SIEMPRE leer y aplicar el skill:** `.agents/skills/git-commits/SKILL.md`

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
