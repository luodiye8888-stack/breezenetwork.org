const fs = require('fs');
const path = require('path');
const file = path.join('src', 'pages', 'help.astro');

let content = fs.readFileSync(file, 'utf8');

// Replace bottom CTA
content = content.replace(
  /<a href="#" class="w-full sm:w-auto bg-breeze-cyan text-\[\#0B1628\] font-bold py-4 px-10 rounded-full shadow-\[0_0_20px_rgba\(34,211,238,0\.4\)\] hover:shadow-\[0_0_30px_rgba\(34,211,238,0\.7\)\] transition-all hover:-translate-y-1">\s*联系微风官方客服\s*<\/a>/g,
  '<a href="https://edp01.breezenetaff.com/#/?code=bSnymFll" target="_blank" rel="nofollow sponsored" class="w-full sm:w-auto bg-breeze-cyan text-[#0B1628] font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] transition-all hover:-translate-y-1">\n            联系微风官方客服\n          </a>'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Replaced bottom CTA successfully');
