import fs from 'fs';

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// 1. Replace Title and Description
content = content.replace(
  /title="[^"]*"/,
  'title="微风网络官网｜2026机场推荐・稳定专线机场推荐"'
);
content = content.replace(
  /description="[^"]*"/,
  'description="微风网络官方网站，提供稳定高速的网络连接服务、套餐与使用教程，并整理2026机场推荐、稳定机场推荐、专线机场推荐、梯子推荐及Clash使用指南，帮助用户选择适合自己的网络方案。"'
);

// 2. Change <p class="text-breeze-cyan..."> to <h1> and change the big H1 to <div>
const oldCyanText = `<p class="text-breeze-cyan font-bold tracking-widest text-xs md:text-sm mb-6 flex items-center justify-center gap-4">
          <span class="w-12 h-[1px] bg-gradient-to-r from-transparent to-breeze-cyan/50"></span>
          微风网络 · BREEZE NETWORK
          <span class="w-12 h-[1px] bg-gradient-to-l from-transparent to-breeze-cyan/50"></span>
        </p>`;
        
const newCyanText = `<h1 class="text-breeze-cyan font-bold tracking-widest text-xs md:text-sm mb-6 flex items-center justify-center gap-4">
          <span class="w-12 h-[1px] bg-gradient-to-r from-transparent to-breeze-cyan/50"></span>
          微风网络官网｜2026稳定机场推荐
          <span class="w-12 h-[1px] bg-gradient-to-l from-transparent to-breeze-cyan/50"></span>
        </h1>`;
content = content.replace(oldCyanText, newCyanText);

const oldH1 = `<h1 class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">稳定连接，<br class="md:hidden"/>像微风一样自然。</h1>`;
const newH1ToDiv = `<div class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight" role="heading" aria-level="2">稳定连接，<br class="md:hidden"/>像微风一样自然。</div>`;
content = content.replace(oldH1, newH1ToDiv);

// 3. Update the Hero paragraph
const oldHeroP = `<p class="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          提供简单、稳定、多平台的全球网络连接服务。<br class="hidden md:block"/>无论是浏览网页、4K 流媒体，还是 AI 工作，我们都能为您提供坚实的基础设施。
        </p>`;
        
const newHeroP = `<p class="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-6 leading-relaxed">
          欢迎访问微风网络官方网站。<br class="hidden md:block"/>
          无论是日常浏览网页、4K 流媒体观影，还是处理高强度的 AI 工作，我们都能为您提供坚实稳定的基础网络设施。
        </p>
        
        <div class="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 text-left backdrop-blur-sm">
          <h2 class="text-breeze-cyan font-bold mb-2">关于微风网络</h2>
          <p class="text-gray-300 text-sm md:text-base leading-relaxed">
            <strong class="text-white">breezenetwork.org</strong> 是微风网络官方品牌网站，提供套餐信息、线路说明、客户端下载、使用教程与服务支持。致力于为全球用户提供无感、极速的跨网络连接体验。
          </p>
        </div>`;
content = content.replace(oldHeroP, newHeroP);

fs.writeFileSync('src/pages/index.astro', content);
