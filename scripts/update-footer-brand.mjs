import fs from 'fs';

let content = fs.readFileSync('src/components/Footer.astro', 'utf8');

const oldBrandCol = `<div>
      <div class="text-white font-bold mb-4">{brand.nameZh}</div>
      <p class="text-sm text-breeze-text">稳定连接，像微风一样自然。</p>
    </div>`;
    
const newBrandCol = `<div>
      <div class="text-white font-bold mb-4">微风网络官方网站</div>
      <p class="text-sm text-breeze-text font-mono mb-2">breezenetwork.org</p>
      <p class="text-sm text-breeze-text">稳定连接，像微风一样自然。</p>
    </div>`;

content = content.replace(oldBrandCol, newBrandCol);

fs.writeFileSync('src/components/Footer.astro', content);
