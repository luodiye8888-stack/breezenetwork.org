import fs from 'fs';

let seo = fs.readFileSync('src/components/SEO.astro', 'utf8');
seo = seo.replace(/<head>/g, '').replace(/<\/head>/g, '');
fs.writeFileSync('src/components/SEO.astro', seo);

let layout = fs.readFileSync('src/layouts/Layout.astro', 'utf8');
layout = layout.replace('<SEO title={title} description={description} />', '<head>\n    <SEO title={title} description={description} />\n    <slot name="head" />\n  </head>');
fs.writeFileSync('src/layouts/Layout.astro', layout);
