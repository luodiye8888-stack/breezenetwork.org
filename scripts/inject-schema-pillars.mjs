import fs from 'fs';
import path from 'path';

function injectSchema(filePath, breadcrumbName) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Parse title and description
  const titleMatch = content.match(/title="([^"]+)"/);
  const descMatch = content.match(/description="([^"]+)"/);
  
  if (!titleMatch || !descMatch) return;
  
  const title = titleMatch[1];
  const desc = descMatch[1];
  const urlPath = path.basename(filePath, '.astro');
  const fullUrl = `https://breezenetwork.org/${urlPath === 'index' ? '' : urlPath}`;
  
  const schemaFragment = `  <Fragment slot="head">
    <link rel="canonical" href="${fullUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="article" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${title}",
        "description": "${desc}",
        "url": "${fullUrl}",
        "inLanguage": "zh-CN",
        "author": {
          "@type": "Organization",
          "name": "微风网络",
          "url": "https://breezenetwork.org/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "微风网络",
          "logo": {
            "@type": "ImageObject",
            "url": "https://breezenetwork.org/logo.png"
          }
        },
        "dateModified": "2026-09-23T00:00:00Z"
      }
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "首页",
            "item": "https://breezenetwork.org/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "${breadcrumbName}",
            "item": "${fullUrl}"
          }
        ]
      }
    </script>
  </Fragment>

`;

  // If already has Fragment slot="head", skip or replace
  if (content.includes('slot="head"')) {
    console.log(`Skipping ${urlPath} (already has head slot)`);
    return;
  }
  
  // Inject right after Layout opening tag
  const layoutRegex = /(<Layout[^>]*>)/;
  content = content.replace(layoutRegex, `$1\n${schemaFragment}`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Injected schema into ${urlPath}`);
}

const pillars = [
  { file: 'src/pages/airport-recommendation.astro', name: '2026机场推荐' },
  { file: 'src/pages/ladder-recommendation.astro', name: '梯子推荐' },
  { file: 'src/pages/clash-airport.astro', name: 'Clash机场推荐' },
  { file: 'src/pages/dedicated-line.astro', name: '专线网络' }
];

pillars.forEach(p => injectSchema(p.file, p.name));
