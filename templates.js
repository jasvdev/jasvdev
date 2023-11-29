import { readFile } from 'fs/promises';

const jsonSkills = await readFile('./data/skills.json', 'utf-8');
const jsonCertifications = await readFile(
  './data/certifications.json',
  'utf-8'
);

const dataSkills = JSON.parse(jsonSkills);
const dataCertifications = JSON.parse(jsonCertifications);

export const TPL_HEADER = `
<img align="center" style="border-radius: 100px" src="./assets/linkedin-Cover.png" />
<p align="center" width="300">
   <h1 align="center">¡Hey 👋! Soy JavsDev 👨🏻‍💻</h1>
</p>
`;

export const TPL_DESCRIPTION = `
<p align="center">Soy <strong>Desarrollador Frontend apasionado por la web y las soluciones mobiles</strong> cuento con bastante experiencia en la industria de la programación.<br />Siempre en busca de nuevos retos en entornos ágiles, creativos y escalables.</p>
`;

export const TPL_CODE_CONTACT = `
\`\`\`javascript
const JavsDev = {
  askMeAbout: [
    'web dev',
    'tech',
    'designe system',
    'microfrontends',
    'Tech Skills',
  ],
  contact: {
    email: 'jasabogal@utp.edu.co',
    network: {
      linkedin: 'https://www.linkedin.com/in/jasabogal/',
      github: 'https://github.com/jasvdev',
    },
  },
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
