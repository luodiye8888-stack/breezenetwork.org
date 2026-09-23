const fs = require('fs');
let content = fs.readFileSync('src/pages/pricing.astro', 'utf8');

const startIndex = content.indexOf('<!-- 用户评价 Carousel -->');
const endIndex = content.indexOf('// --- Link Cloaking Logic ---');

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `<!-- 用户评价 Marquee -->
  <section class="py-24 px-4 bg-[#0B1628]/50 border-t border-white/5 overflow-hidden">
    <div class="max-w-4xl mx-auto text-center mb-12">
      <h2 class="text-3xl font-bold text-white mb-4">来自微风用户的真实反馈</h2>
      <p class="text-gray-400">稳定、快速，听听他们的使用体验。</p>
    </div>
    
    <div class="relative w-full max-w-7xl mx-auto overflow-hidden">
      <!-- 左右渐变遮罩层，让划入划出更自然 -->
      <div class="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#0B1628]/50 to-transparent z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#0B1628]/50 to-transparent z-10 pointer-events-none"></div>
      
      <div class="marquee-track flex w-max">
        <!-- 为了无缝滚动，我们将 5 个评价重复渲染 2 遍 -->
        {[...Array(2)].map((_, i) => (
          <div class="flex gap-6 px-3" aria-hidden={i === 1 ? 'true' : 'false'}>
            <!-- Slide 1 -->
            <div class="w-[320px] md:w-[400px] flex-shrink-0">
              <div class="bg-[#131F33] border border-white/5 p-8 rounded-3xl flex flex-col h-full shadow-xl hover:border-breeze-blue/30 transition-colors">
                <div class="flex text-yellow-400 mb-4 space-x-1">
                  {Array.from({length: 5}).map(() => (
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p class="text-sm md:text-base text-gray-300 italic mb-6 leading-relaxed flex-grow">"之前打 APEX 经常丢包，换了 Breeze 的 IPLC 专线之后稳定在 40ms 左右，晚高峰也稳如老狗，真的是竞技玩家的福音！"</p>
                <div class="flex items-center gap-3 mt-auto">
                  <div class="w-10 h-10 rounded-full bg-breeze-blue/20 flex items-center justify-center text-breeze-cyan font-bold">K</div>
                  <div class="text-left">
                    <div class="font-bold text-white text-sm">@Gamer_K</div>
                    <div class="text-xs text-gray-500">破风 (Breaking) 订阅</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 2 -->
            <div class="w-[320px] md:w-[400px] flex-shrink-0">
              <div class="bg-[#131F33] border border-white/5 p-8 rounded-3xl flex flex-col h-full shadow-xl hover:border-breeze-blue/30 transition-colors">
                <div class="flex text-yellow-400 mb-4 space-x-1">
                  {Array.from({length: 5}).map(() => (
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p class="text-sm md:text-base text-gray-300 italic mb-6 leading-relaxed flex-grow">"买的长风不限时套餐，用来看 Netflix 4K 完全不卡。最主要是不限时流量放在那边不用也不会过期，对于偶尔追剧的人来说太良心了。"</p>
                <div class="flex items-center gap-3 mt-auto">
                  <div class="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">M</div>
                  <div class="text-left">
                    <div class="font-bold text-white text-sm">@MovieFan99</div>
                    <div class="text-xs text-gray-500">长风 · 不限时 订阅</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 3 -->
            <div class="w-[320px] md:w-[400px] flex-shrink-0">
              <div class="bg-[#131F33] border border-white/5 p-8 rounded-3xl flex flex-col h-full shadow-xl hover:border-breeze-blue/30 transition-colors">
                <div class="flex text-yellow-400 mb-4 space-x-1">
                  {Array.from({length: 5}).map(() => (
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p class="text-sm md:text-base text-gray-300 italic mb-6 leading-relaxed flex-grow">"原生 IP 节点非常纯净，ChatGPT 和 Claude 终于不会被风控和弹验证码了。对于需要跨区使用 AI 和 API 的开发人员来说绝对是神器。"</p>
                <div class="flex items-center gap-3 mt-auto">
                  <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">A</div>
                  <div class="text-left">
                    <div class="font-bold text-white text-sm">@Dev_Alex</div>
                    <div class="text-xs text-gray-500">御风 (Mastery) 订阅</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 4 -->
            <div class="w-[320px] md:w-[400px] flex-shrink-0">
              <div class="bg-[#131F33] border border-white/5 p-8 rounded-3xl flex flex-col h-full shadow-xl hover:border-breeze-blue/30 transition-colors">
                <div class="flex text-yellow-400 mb-4 space-x-1">
                  {Array.from({length: 5}).map(() => (
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p class="text-sm md:text-base text-gray-300 italic mb-6 leading-relaxed flex-grow">"晚高峰的稳定性是我用过几家服务商里表现最好的。现在跨国开 Zoom 视频会议再也没有因为掉线而尴尬过，贵有贵的道理，物超所值。"</p>
                <div class="flex items-center gap-3 mt-auto">
                  <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">R</div>
                  <div class="text-left">
                    <div class="font-bold text-white text-sm">@RemoteWorker</div>
                    <div class="text-xs text-gray-500">乘风 (Riding) 订阅</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 5 -->
            <div class="w-[320px] md:w-[400px] flex-shrink-0">
              <div class="bg-[#131F33] border border-white/5 p-8 rounded-3xl flex flex-col h-full shadow-xl hover:border-breeze-blue/30 transition-colors">
                <div class="flex text-yellow-400 mb-4 space-x-1">
                  {Array.from({length: 5}).map(() => (
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p class="text-sm md:text-base text-gray-300 italic mb-6 leading-relaxed flex-grow">"客服响应非常快，最重要的是一键订阅导入 Clash 就能直接用，小白友好度拉满，再也不用去折腾那些复杂节点配置了。"</p>
                <div class="flex items-center gap-3 mt-auto">
                  <div class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">L</div>
                  <div class="text-left">
                    <div class="font-bold text-white text-sm">@Layla_T</div>
                    <div class="text-xs text-gray-500">清风 (Breeze) 订阅</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <style>
    .marquee-track {
      animation: scroll 40s linear infinite;
    }
    .marquee-track:hover {
      animation-play-state: paused;
    }
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  </style>

  <script>
    // --- Link Cloaking Logic ---`;
  
  content = content.substring(0, startIndex) + newContent + content.substring(endIndex + 30);
  fs.writeFileSync('src/pages/pricing.astro', content, 'utf8');
  console.log('Success');
} else {
  console.error('Could not find markers', startIndex, endIndex);
}
