import fs from 'fs';

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

const oldHeroBg = `<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-breeze-cyan/10 blur-[150px] pointer-events-none"></div>`;

const newHeroBg = `<!-- Dynamic Image Background -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <!-- 基础背景图 -->
        <img src="/hero-bg.jpg" alt="微风网络核心架构" class="w-full h-full object-cover object-center opacity-60 mix-blend-lighten" />
        <!-- 渐变遮罩：让顶部文字清晰，底部完美融入下一区块的深色 -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#0B1628]/70 via-[#0B1628]/50 to-breeze-dark"></div>
        <!-- 侧边柔和遮罩：集中视觉焦点 -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#0B1628]/80 via-transparent to-[#0B1628]/80"></div>
      </div>`;

content = content.replace(oldHeroBg, newHeroBg);

fs.writeFileSync('src/pages/index.astro', content);
