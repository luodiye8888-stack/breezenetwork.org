import fs from 'fs';

let content = fs.readFileSync('src/pages/index.astro', 'utf8');
const oldSchemaRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;

const newSchema = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "微风网络",
        "alternateName": "Breeze Network",
        "url": "https://breezenetwork.org/"
      },
      {
        "@type": "Organization",
        "name": "微风网络",
        "alternateName": "Breeze Network",
        "url": "https://breezenetwork.org/",
        "logo": "https://breezenetwork.org/logo.png"
      }
    ]
  }
  </script>`;

content = content.replace(oldSchemaRegex, newSchema);
fs.writeFileSync('src/pages/index.astro', content);
