const fs = require('fs');
const path = require('path');
const guidesDir = path.join('src', 'pages', 'guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.astro'));
files.forEach(file => {
  const filePath = path.join(guidesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/description="([^"]+)"/g, (match, p1) => {
    return 'description="' + p1.replace(/\s+/g, ' ').trim() + '"';
  });
  fs.writeFileSync(filePath, content, 'utf8');
});
