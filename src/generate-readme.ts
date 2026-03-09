import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface ISkill {
  img: string;
  logo: string;
  style: string;
  logo_color: string;
}

type tyCertGroup = Record<string, string[]>;

const PROVIDER_LABELS: Record<string, string> = {
  udemy: "Udemy",
  microsoft: "Microsoft",
  platzy: "Platzy",
  devTalles: "DevTalles",
};

function buildSkillsBadges(skillsGrouped: Record<string, ISkill[]>): string {
  const badges = Object.values(skillsGrouped)
    .flatMap((skills) =>
      skills.map((skill) => {
        const logoColor = skill.logo_color
          ? `&logoColor=${skill.logo_color}`
          : "";
        const url = `https://img.shields.io/badge/${skill.img}?style=${skill.style}&logo=${skill.logo}${logoColor}`;
        return `  <img src="${url}" alt="${skill.logo}" height="28" />`;
      }),
    )
    .join("\n");

  return `<p align="left">\n${badges}\n</p>`;
}

function scanCertifications(certsDir: string): tyCertGroup {
  const groups: tyCertGroup = {};
  const providers = readdirSync(certsDir);

  for (const provider of providers) {
    const providerPath = join(certsDir, provider);
    const stat = statSync(providerPath);

    if (!stat.isDirectory()) continue;

    const jpgs = readdirSync(providerPath).filter(
      (f) => extname(f).toLowerCase() === ".jpg",
    );

    if (jpgs.length > 0) {
      groups[provider] = jpgs.map(
        (f) => `src/assets/certifications/${provider}/${f}`,
      );
    }
  }

  return groups;
}

function buildCertificationsSection(groups: tyCertGroup): string {
  return Object.entries(groups)
    .map(([provider, images]) => {
      const label = PROVIDER_LABELS[provider] ?? provider;
      const imgTags = images
        .map((src) => {
          const name = basename(src, ".jpg");
          return `  <img src="${src}" alt="${name}" height="120" />`;
        })
        .join("\n");
      return `### ${label}\n<p align="left">\n${imgTags}\n</p>`;
    })
    .join("\n\n");
}

function buildStatsSection(): string {
  return `<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=jasvdev&theme=dark&hide_border=true" alt="GitHub Streak" />
</div>`;
}

const templatePath = join(process.cwd(), "readme-template.md");
const outputPath = join(process.cwd(), "README.md");
const skillsPath = join(process.cwd(), "src/assets/skills.json");
const certsDir = join(process.cwd(), "src/assets/certifications");

console.log("Generating README.md...");

try {
  const template = readFileSync(templatePath, "utf-8");
  const skills: Record<string, ISkill[]> = require(skillsPath);
  const certGroups = scanCertifications(certsDir);

  const readme = template
    .replace("{{SKILLS}}", buildSkillsBadges(skills))
    .replace("{{CERTIFICATIONS}}", buildCertificationsSection(certGroups))
    .replace("{{STATS}}", buildStatsSection());

  writeFileSync(outputPath, readme, "utf-8");
  console.log("README.md generated successfully!");
} catch (error) {
  console.error("Error generating README.md:", error);
  process.exit(1);
}
