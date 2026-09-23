const fs = require('fs');
const path = require('path');

const files = [
  'airport-recommendation.astro',
  'cheap-airport.astro',
  'clash-airport.astro',
  'dedicated-line.astro',
  'ladder-recommendation.astro'
];

files.forEach(file => {
  const p = path.join('src/pages', file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  
  const match = content.match(/<Layout title="([^"]+)" description="([^>]*?)>/);
  if (match) {
    let desc = match[2];
    if (desc.endsWith('?')) desc = desc.slice(0, -1) + '。';
    if (desc.endsWith('？')) desc = desc.slice(0, -1) + '。';
    if (!desc.endsWith('"')) desc += '"';
    
    const newTag = '<Layout title="' + match[1] + '" description="' + desc + '">';
    content = content.replace(/<Layout title="([^"]+)" description="([^>]*?)>/, newTag);
    fs.writeFileSync(p, content, 'utf8');
  }
});
