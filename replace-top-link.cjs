const fs = require('fs');
const path = require('path');
const file = path.join('src', 'pages', 'help.astro');

let content = fs.readFileSync(file, 'utf8');

// Replace top category quick link
content = content.replace(
  /<a href="#cat-support" class="bg-breeze-cyan\/10 border border-breeze-cyan\/30 text-breeze-cyan px-5 py-2\.5 rounded-xl transition-all text-sm font-bold">联系客服<\/a>/g,
  '<a href="https://edp01.breezenetaff.com/#/?code=bSnymFll" target="_blank" rel="nofollow sponsored" class="bg-breeze-cyan/10 border border-breeze-cyan/30 text-breeze-cyan px-5 py-2.5 rounded-xl transition-all text-sm font-bold">联系客服</a>'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Replaced top quick link');
