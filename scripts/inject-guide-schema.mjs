import fs from 'fs';

let content = fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8');

const headInjection = `  <Fragment slot="head">
    <script type="application/ld+json" set:html={\`
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "\${title}",
        "description": "\${description}",
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
        }
      }
    \`}></script>
    <script type="application/ld+json" set:html={\`
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
            "name": "使用教程",
            "item": "https://breezenetwork.org/guides"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "\${title}"
          }
        ]
      }
    \`}></script>
  </Fragment>`;

if (!content.includes('TechArticle')) {
  content = content.replace('<Layout title={title} description={description}>', `<Layout title={title} description={description}>\n${headInjection}`);
  fs.writeFileSync('src/layouts/GuideLayout.astro', content);
}
