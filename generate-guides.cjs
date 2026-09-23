const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('src/pages/guides.astro', 'utf8');

const matches = [...content.matchAll(/<a href=\"#\"([^>]*)>(.*?)<\/a>/gs)];

const guidesDir = path.join('src', 'pages', 'guides');
if (!fs.existsSync(guidesDir)) {
  fs.mkdirSync(guidesDir, { recursive: true });
}

let counter = 1;
matches.forEach(match => {
  const fullTag = match[0];
  const attrs = match[1];
  let titleHtml = match[2];
  
  // Clean up title
  let title = titleHtml.replace(/<[^>]+>/g, '').trim();
  
  // Generate a slug based on title (very rough approximation for Chinese)
  let slug = 'topic-';
  if (title.includes('新手')) slug = 'getting-started';
  else if (title.includes('Clash Verge')) slug = 'clash-verge-rev';
  else if (title.includes('订阅')) slug = 'subscription-import';
  else if (title.includes('延迟高')) slug = 'high-latency';
  else if (title.includes('Timeout')) slug = 'clash-timeout';
  else if (title.includes('是什么')) slug = 'what-is-airport';
  else if (title.includes('起步')) slug = 'quick-start-' + counter;
  else if (title.includes('更新')) slug = 'update-subscription';
  else if (title.includes('模式')) slug = 'proxy-modes-' + counter;
  else if (title.includes('香港')) slug = 'region-selection';
  else if (title.includes('区别')) slug = 'line-differences-' + counter;
  else if (title.includes('测速')) slug = 'speed-test';
  else if (title.includes('流媒体') || title.includes('Netflix')) slug = 'streaming-unlock';
  else if (title.includes('AI') || title.includes('ChatGPT')) slug = 'ai-unlock';
  else if (title.includes('原生 IP')) slug = 'native-ip';
  else if (title.includes('失败')) slug = 'connection-failed-' + counter;
  else if (title.includes('打不开')) slug = 'browser-issue';
  else if (title.includes('时间')) slug = 'time-sync-issue';
  else if (title.includes('环境')) slug = 'network-change-issue';
  else slug = 'guide-' + counter;
  
  counter++;

  // 避免重名
  while(fs.existsSync(path.join(guidesDir, slug + '.astro'))) {
    slug = slug + '-1';
  }

  // Update original content
  content = content.replace(fullTag, `<a href="/guides/${slug}"${attrs}>${titleHtml}</a>`);

  // Create article content
  const articleContent = `---
import GuideLayout from '../../layouts/GuideLayout.astro';
---
<GuideLayout 
  title="${title}"
  description="关于 ${title} 的完整解答与操作指南，帮助您更好地使用微风网络。"
  summary="【重点速读】遇到这个问题不用慌！本文为您提供了快速的应对策略。点击下方的大按钮可直接跳转微风网络后台进行节点配置和更新。详情请参考下方完整图文步骤。"
>
  <h2>什么是 ${title}？</h2>
  <p>在日常使用微风网络的过程中，许多用户都会遇到与<strong>${title}</strong>相关的问题。这实际上是正常现象，主要与网络环境、本地配置或路由规则有关。</p>
  
  <h2>核心解决步骤</h2>
  <ol>
    <li>首先，请确认您的系统网络环境正常。</li>
    <li>其次，打开客户端，检查订阅是否在有效期内。</li>
    <li>尝试切换到全局模式，观察问题是否得到解决。</li>
    <li>如果依然无法解决，请尝试更换节点，或者在用户中心重新复制最新的订阅链接。</li>
  </ol>
  
  <h2>注意事项与进阶建议</h2>
  <p>为了获得最佳的稳定性和速度，我们建议您日常使用时开启规则模式（Rule），并尽量选择延迟较低的专线节点。如果您对隐私或跨区服务有极高要求，可以考虑使用原生 IP 节点。</p>
</GuideLayout>
`;
  
  fs.writeFileSync(path.join(guidesDir, slug + '.astro'), articleContent, 'utf8');
});

fs.writeFileSync('src/pages/guides.astro', content, 'utf8');
console.log('Generated ' + (counter - 1) + ' guides and updated links!');
