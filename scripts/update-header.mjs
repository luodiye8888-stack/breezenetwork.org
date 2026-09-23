import fs from 'fs';

let content = fs.readFileSync('src/components/Header.astro', 'utf8');

const replacement = `<nav class="hidden md:flex items-center gap-6 text-sm text-breeze-text h-16">
      <a href="/" class="hover:text-white transition-colors">首页</a>
      <a href="/pricing" class="hover:text-white transition-colors">套餐</a>
      <a href="/network" class="hover:text-white transition-colors">网络</a>
      <a href="/guides" class="hover:text-white transition-colors">使用教程</a>
      <a href="/status" class="hover:text-white transition-colors">服务状态</a>
      
      <!-- 资源 Dropdown -->
      <div class="relative group h-full flex items-center cursor-default">
        <span class="hover:text-white flex items-center gap-1 transition-colors">
          资源
          <svg class="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
        <div class="absolute top-[60px] left-1/2 -translate-x-1/2 w-40 bg-[#0B1628]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 transform origin-top group-hover:translate-y-0 translate-y-2">
          <a href="/airport-recommendation" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">2026机场推荐</a>
          <a href="/ladder-recommendation" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">梯子推荐</a>
          <a href="/clash-airport" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Clash机场推荐</a>
          <a href="/dedicated-line" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">专线网络</a>
        </div>
      </div>

      <!-- 支持与法律 Dropdown -->
      <div class="relative group h-full flex items-center cursor-default">
        <span class="hover:text-white flex items-center gap-1 transition-colors">
          支持与法律
          <svg class="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
        <div class="absolute top-[60px] left-1/2 -translate-x-1/2 w-36 bg-[#0B1628]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 transform origin-top group-hover:translate-y-0 translate-y-2">
          <a href="/help" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">帮助中心</a>
          <a href="/contact" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">联系我们</a>
          <a href="/privacy" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">隐私政策</a>
          <a href="/terms" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">服务条款</a>
        </div>
      </div>
    </nav>`;

const regex = /<nav class="hidden md:flex items-center gap-6 text-sm text-breeze-text">[\s\S]*?<\/nav>/;
content = content.replace(regex, replacement);

fs.writeFileSync('src/components/Header.astro', content);
