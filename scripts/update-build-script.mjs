import fs from 'fs';
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.build = 'astro build && node -e "require(\'fs\').copyFileSync(\'dist/sitemap-index.xml\', \'dist/sitemap.xml\')"';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
