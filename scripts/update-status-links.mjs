import fs from 'fs';

let content = fs.readFileSync('src/pages/status.astro', 'utf8');

// 1. Transform the h3 into a clickable anchor tag
const oldH3 = `<h3 class="text-lg font-bold text-white mb-1">{item.name}</h3>`;
const newH3 = `<h3 class="text-lg font-bold text-white mb-1">
                <a href={item.url} class="hover:text-breeze-cyan transition-colors" title={\`访问 \${item.name}\`}>
                  {item.name}
                  <svg class="w-4 h-4 inline-block ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </h3>`;
content = content.replace(oldH3, newH3);

// 2. Add an internal link hub at the bottom of the page to prevent dead ends
const oldNotice = `    </div>
  </main>`;

const newNotice = `
      <!-- Internal Linking Hub / Contextual Nav -->
      <div class="border-t border-white/10 pt-8 mt-12 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-gray-400 text-sm">
          发现服务状态异常？
        </div>
        <div class="flex flex-wrap items-center gap-3 text-sm">
          <a href="/" class="text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5 transition-colors">返回首页</a>
          <a href="/help" class="text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5 transition-colors">排查故障 (帮助中心)</a>
          <a href="/network" class="text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5 transition-colors">查看网络线路</a>
          <a href="/pricing" class="text-breeze-cyan hover:text-white bg-breeze-cyan/10 hover:bg-breeze-cyan/20 px-4 py-2 rounded-lg border border-breeze-cyan/20 transition-colors font-medium">了解更多套餐</a>
        </div>
      </div>
    </div>
  </main>`;

content = content.replace(`    </div>\n  </main>`, newNotice);

fs.writeFileSync('src/pages/status.astro', content);
