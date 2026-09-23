import fs from 'fs';
let content = fs.readFileSync('src/components/Footer.astro', 'utf8');
content = content.replace(
  '<li><a href="/clash-airport" class="hover:text-white">Clash机场推荐</a></li>', 
  '<li><a href="/clash-airport" class="hover:text-white">Clash机场推荐</a></li>\n        <li><a href="/dedicated-line" class="hover:text-white">专线机场推荐</a></li>'
);
fs.writeFileSync('src/components/Footer.astro', content);
