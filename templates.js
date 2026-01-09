import { readFile, readdir } from 'fs/promises';

const jsonSkills = await readFile('./data/skills.json', 'utf-8');

const getCertifications = async () => {
    const certsDir = './assets/certifications';
    const data = {};
    const dirs = await readdir(certsDir, { withFileTypes: true });

    for (const dir of dirs) {
        if (dir.isDirectory()) {
            const provider = dir.name;
            console.log(provider);
            const files = await readdir(`${certsDir}/${provider}`);
            const images = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
            
            // microsoft images seem to need larger width based on previous json
            const width = provider === 'microsoft' ? '360' : '260';

            data[provider] = images.map((file) => ({
                width,
                src: `${certsDir}/${provider}/${file}`,
            }));
        }
    }
    console.log(data);
    return data;
};

const dataSkills = JSON.parse(jsonSkills);
const dataCertifications = await getCertifications();

export const TPL_HEADER = `
<div align="center">
  <img src="./assets/linkedin-Cover.png" width="100%" style="border-radius: 12px; margin-bottom: 20px; max-width: 800px;" alt="Cover Image" />
  <h1 align="center">Hola, soy JavsDev 👨🏻‍💻</h1>
  <h3 align="center">🚀 Frontend Developer | Tech Enthusiast</h3>
</div>
`;

export const TPL_DESCRIPTION = `
<p align="center">
  <strong>Transformando ideas en experiencias digitales escalables y de alto impacto.</strong> 🌟
</p>

<p align="center">
  Especializado en el ecosistema <strong>Frontend</strong>, con un fuerte enfoque en <em>Arquitectura de Software</em>, <em>Design Systems</em> y <em>Micro-frontends</em>.
  <br />
  Me apasiona construir soluciones eficientes en entornos ágiles, priorizando siempre la calidad del código, la experiencia de usuario y el rendimiento.
  <br />
  <br />
  <em>"Siempre aprendiendo, siempre creando."</em> 🚀
</p>
`;

export const TPL_CODE_CONTACT = `
\`\`\`javascript
const JavsDev = {
  role: "Senior Frontend Engineer 👨‍💻",
  passion: [
    "Building Scalable Web Apps",
    "UX/UI Architecture",
    "Mobile Development"
  ],
  specialties: {
    core: ["React", "TypeScript", "Next.js"],
    architecture: ["Micro-frontends", "Design Systems", "Clean Architecture"],
  },
  contact: {
    email: "jasabogal@utp.edu.co",
    social: {
      linkedin: "https://www.linkedin.com/in/jasabogal/",
      github: "https://github.com/jasvdev"
    }
  },
  status: "Ready for new challenges! 🚀"
};
\`\`\`
`;

export const TPL_EXPERIENCE = `
## 💎 Experiencia

Soy un apasionado por el mundo del desarrollo web, tengo experiencia en varios frameworks comerciales y buenas practicas de desarrollo, me he relacionado con equipos en diversos entornos, siempre desde la prespectiva agil.

La logica de negocio en los que me he encontrado son diversos, desde entornos empresariales y startups ERPs, market places, pasarelas de pago, microfronteds, backoffices, designe system entre otros.

Siempre en busca de nuevos aprendizajes para crecer al ritmo de la web 🌐.
`;

const IMG_SKILLS = dataSkills
  .map(
    ({ img, logo, style, logo_color }) =>
      `\t<img src="https://img.shields.io/badge/${img}?style=${style}&logo=${logo}${
        logo_color ? `&logoColor=${logo_color}` : ''
      }" alt="${logo}">`
  )
  .join('\n');

export const TPL_SKILL = `
## 🛠️ Tech Skills

<p align="left">
${IMG_SKILLS}
</p>
`;

// certifications
const IMG_CERTIFICATIONS_DEVTALLES = dataCertifications.devTalles
  .map(
    ({ width, src }) =>
      `\t<img width="${width}" style="border-radius: 20px; padding: 4px" src="${src}">`
  )
  .join('\n');

const IMG_CERTIFICATIONS_PLATZY = dataCertifications.platzy
  .map(
    ({ width, src }) =>
      `\t<img width="${width}" style="border-radius: 20px; padding: 4px" src="${src}">`
  )
  .join('\n');

const IMG_CERTIFICATIONS_UDEMY = dataCertifications.udemy
  .map(
    ({ width, src }) =>
      `\t<img width="${width}" style="border-radius: 20px; padding: 4px" src="${src}">`
  )
  .join('\n');

const IMG_CERTIFICATIONS_MICROSOFT = dataCertifications.microsoft
  .map(
    ({ width, src }) =>
      `\t<img width="${width}" style="border-radius: 20px; padding: 4px" src="${src}">`
  )
  .join('\n');

export const TPL_CERTIFICATIONS = `
## DevTalles

<p align="left" width="260">
${IMG_CERTIFICATIONS_DEVTALLES}
</p>

## Platzy

<p align="left" width="260">
${IMG_CERTIFICATIONS_PLATZY}
</p>

## Udemy

<p align="left" width="260">
${IMG_CERTIFICATIONS_UDEMY}
</p>

## Microsoft

<p align="left" width="260">
${IMG_CERTIFICATIONS_MICROSOFT}
</p>
`;

export const TPL_STATISTICS = `
<!-- ## 📊 Estadisticas

<p align="center"><img src="https://github-readme-stats.vercel.app/api?username=jasvdev&count_private=true&include_all_commits=true&show_icons=true&theme=react" alt="javsdev :: Profile Stats" />
</p> -->

<!-- <p align="center">
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=jasvdev&langs_count=10&theme=tokyonight&layout=compact" alt="javsdev :: Top Langs" />
</p> -->

<!-- <p align="center"><img src="https://github-readme-streak-stats.herokuapp.com/?user=jasvdev&theme=dark&count_private=true&bg_color=0d1116&title_color=ce09ec&text_color=a4aacb&icon_color=007ec6" alt="javsdev :: Profile Stats" /></p> -->

<!-- <div align="center">
  <img src="https://img.shields.io/github/followers/JasvDev?logo=GitHub&style=for-the-badge" alt="javsdev :: follower" />
  <img src="https://img.shields.io/github/stars/JasvDev?logo=github&style=for-the-badge" alt="javsdev :: starts" />
  <img src="https://img.shields.io/github/sponsors/JasvDev?color=BF4B8A&logo=githubsponsors&style=for-the-badge&label=Sponsor%20on%20Github" alt="javsdev :: sponsor" />
</div> -->

<!-- <img style="width:100%;height:3px;" src="./assets/bar.gif" /> -->

</br>
`;
