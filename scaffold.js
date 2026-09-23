const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const fullPath = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
};

// 1. Data Configs
write('src/data/brand.ts', `
export const brand = {
  name: 'Breeze Network',
  nameZh: '微风网络',
  url: 'https://breezenetwork.org',
  email: 'support@breezenetwork.org'
};
`);

write('src/data/pricing.ts', `
export const pricingPlans = [
  { name: 'Starter', flow: '100GB', cycle: '月付', devices: 2, speed: '标准', users: '轻度用户', cta: '立即购买' },
  { name: 'Standard', flow: '300GB', cycle: '月付', devices: 5, speed: '高速', users: '主流日常', cta: '立即购买' },
  { name: 'Pro', flow: '1TB', cycle: '月付', devices: 10, speed: '专线极速', users: '重度与团队', cta: '立即购买' }
];
// TODO: Replace with real Breeze Network plans.
`);

// 2. Components
write('src/components/SEO.astro', `
---
import { brand } from '../data/brand';
const { title, description, canonicalURL = new URL(Astro.url.pathname, Astro.site).toString() } = Astro.props;
const siteUrl = Astro.site?.toString() || brand.url;
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:type" content="website" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <link rel="sitemap" href="/sitemap-index.xml" />
</head>
`);

write('src/components/Header.astro', `
---
import { brand } from '../data/brand';
---
<header class="fixed top-0 w-full z-50 bg-breeze-dark/80 backdrop-blur-md border-b border-breeze-card transition-all">
  <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2 group text-white hover:opacity-80 transition">
      <svg class="w-8 h-8 text-breeze-blue" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2L2 7l10 5 10-5-10-5zm0 10l-10-5v10l10 5 10-5V7l-10 5z"/>
      </svg>
      <div class="flex flex-col">
        <span class="font-bold text-lg leading-tight">{brand.name}</span>
        <span class="text-[10px] text-breeze-cyan leading-tight">{brand.nameZh}</span>
      </div>
    </a>
    <nav class="hidden md:flex items-center gap-6 text-sm text-breeze-text">
      <a href="/" class="hover:text-white">首页</a>
      <a href="/pricing" class="hover:text-white">套餐</a>
      <a href="/network" class="hover:text-white">网络</a>
      <a href="/guides" class="hover:text-white">使用教程</a>
      <a href="/status" class="hover:text-white">服务状态</a>
    </nav>
    <div class="hidden md:flex gap-4">
      <a href="#" class="text-sm text-white px-4 py-2 hover:text-breeze-cyan transition">登录</a>
      <a href="/pricing" class="text-sm bg-breeze-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">立即开始</a>
    </div>
  </div>
</header>
`);

write('src/components/Footer.astro', `
---
import { brand } from '../data/brand';
---
<footer class="bg-breeze-dark border-t border-breeze-card pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
    <div>
      <div class="text-white font-bold mb-4">{brand.name} {brand.nameZh}</div>
      <p class="text-sm text-breeze-text">稳定连接，像微风一样自然。</p>
    </div>
    <div>
      <h3 class="text-white font-bold mb-4">产品</h3>
      <ul class="space-y-2 text-sm text-breeze-text">
        <li><a href="/pricing" class="hover:text-white">套餐</a></li>
        <li><a href="/network" class="hover:text-white">网络</a></li>
        <li><a href="/status" class="hover:text-white">服务状态</a></li>
      </ul>
    </div>
    <div>
      <h3 class="text-white font-bold mb-4">资源</h3>
      <ul class="space-y-2 text-sm text-breeze-text">
        <li><a href="/airport-recommendation" class="hover:text-white">2026机场推荐</a></li>
        <li><a href="/ladder-recommendation" class="hover:text-white">梯子推荐</a></li>
        <li><a href="/clash-airport" class="hover:text-white">Clash机场推荐</a></li>
      </ul>
    </div>
    <div>
      <h3 class="text-white font-bold mb-4">支持与法律</h3>
      <ul class="space-y-2 text-sm text-breeze-text">
        <li><a href="/help" class="hover:text-white">帮助中心</a></li>
        <li><a href="/contact" class="hover:text-white">联系我们</a></li>
        <li><a href="/privacy" class="hover:text-white">隐私政策</a></li>
        <li><a href="/terms" class="hover:text-white">服务条款</a></li>
      </ul>
    </div>
  </div>
  <div class="text-center text-sm text-breeze-text border-t border-breeze-card pt-8">
    &copy; 2026 {brand.name}. All rights reserved.
  </div>
</footer>
`);

// 3. Layout
write('src/layouts/Layout.astro', `
---
import SEO from '../components/SEO.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

const { title, description } = Astro.props;
---
<html lang="zh-CN" class="bg-breeze-dark text-breeze-text">
  <SEO title={title} description={description} />
  <body class="min-h-screen flex flex-col font-sans antialiased pt-16">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </body>
</html>
`);

// Global CSS
write('src/styles/global.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
`);

// 4. Pages Structure Generator
const pages = [
  {
    path: 'src/pages/index.astro',
    title: '微风网络 Breeze Network｜2026机场推荐・稳定专线机场推荐',
    desc: '微风网络 Breeze Network 提供稳定、多平台的网络连接服务，同时整理2026机场推荐、稳定机场推荐、专线机场推荐与Clash使用指南，帮助用户根据线路、价格与使用需求选择合适方案。',
    h1: '微风网络 Breeze Network｜2026 稳定机场推荐',
    content: `
      <section class="py-24 px-4 text-center">
        <p class="text-breeze-cyan font-bold tracking-widest text-sm mb-4">BREEZE NETWORK · 微风网络</p>
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">稳定连接，像微风一样自然。</h1>
        <p class="max-w-2xl mx-auto text-lg mb-10">微风网络 Breeze Network 提供简单、稳定、多平台的网络连接服务。如果你正在寻找 2026 机场推荐、稳定机场、专线机场或适合 Clash 使用的网络服务，可以从这里开始。</p>
        <div class="flex gap-4 justify-center">
          <a href="/pricing" class="bg-breeze-blue text-white px-8 py-3 rounded-md hover:bg-blue-600 transition">查看套餐</a>
          <a href="/airport-recommendation" class="text-white bg-breeze-card px-8 py-3 rounded-md hover:bg-opacity-80 border border-gray-800 transition">查看 2026 机场推荐指南 &rarr;</a>
        </div>
      </section>
      
      <section class="py-20 bg-breeze-card px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">2026 机场推荐与网络选择指南</h2>
          <p class="text-center mb-12 max-w-2xl mx-auto">除了提供 Breeze Network 服务，我们也整理不同线路、客户端和使用场景的选择知识，帮助用户了解应该如何选择。</p>
          <div class="grid md:grid-cols-4 gap-6">
            <a href="/airport-recommendation" class="block p-6 bg-breeze-dark rounded-xl hover:-translate-y-1 transition border border-gray-800">
              <h3 class="text-xl font-bold text-white mb-2">2026 机场推荐</h3>
              <p class="text-sm">了解如何选择稳定与专线机场</p>
            </a>
            <a href="/ladder-recommendation" class="block p-6 bg-breeze-dark rounded-xl hover:-translate-y-1 transition border border-gray-800">
              <h3 class="text-xl font-bold text-white mb-2">梯子推荐</h3>
              <p class="text-sm">手机与电脑端科学上网工具选择</p>
            </a>
            <a href="/clash-airport" class="block p-6 bg-breeze-dark rounded-xl hover:-translate-y-1 transition border border-gray-800">
              <h3 class="text-xl font-bold text-white mb-2">Clash 机场推荐</h3>
              <p class="text-sm">适合 Clash 的稳定节点指南</p>
            </a>
            <a href="/dedicated-line" class="block p-6 bg-breeze-dark rounded-xl hover:-translate-y-1 transition border border-gray-800">
              <h3 class="text-xl font-bold text-white mb-2">专线机场</h3>
              <p class="text-sm">IPLC/IEPL 极速专线分析</p>
            </a>
          </div>
        </div>
      </section>
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Breeze Network",
        "alternateName": "微风网络",
        "url": "https://breezenetwork.org/"
      }
      </script>
    `
  },
  {
    path: 'src/pages/pricing.astro',
    title: '套餐价格 - 微风网络 Breeze Network',
    desc: 'Breeze Network 微风网络提供灵活的套餐组合，支持多设备与高速网络，满足从日常到重度使用的各类场景。',
    h1: '灵活的套餐选择',
    content: '<section class="py-20 px-4"><div class="max-w-7xl mx-auto"><h1 class="text-4xl text-white font-bold mb-4 text-center">灵活的套餐选择</h1><p class="text-center mb-12">无论你是轻度冲浪还是重度工作，都有适合你的方案。</p><!-- TODO: Load from data --><p class="text-center text-sm text-breeze-cyan">加载套餐数据中...</p></div></section>'
  },
  {
    path: 'src/pages/network.astro',
    title: '全球网络覆盖 - 微风网络 Breeze Network',
    desc: '探索微风网络全球节点分布，为稳定连接而设计的网络架构。',
    h1: '全球网络，为稳定连接而设计',
    content: '<section class="py-20 px-4 text-center"><h1 class="text-4xl text-white font-bold mb-4">全球网络，为稳定连接而设计</h1><p>覆盖多个常用地区，线路持续优化，根据套餐和实际服务提供情况为准。</p></section>'
  },
  {
    path: 'src/pages/status.astro',
    title: '服务状态 - 微风网络 Breeze Network',
    desc: '查看 Breeze Network 微风网络的实时服务与网络状态。',
    h1: 'Breeze Network 服务状态',
    content: '<section class="py-20 px-4 text-center"><h1 class="text-4xl text-white font-bold mb-4">服务状态</h1><p>所有系统运行正常。</p></section>'
  },
  {
    path: 'src/pages/about.astro',
    title: '关于我们 - 微风网络 Breeze Network',
    desc: '了解 Breeze Network 微风网络的品牌理念：稳定、简单、透明。',
    h1: '关于微风网络 Breeze Network',
    content: '<section class="py-20 px-4"><div class="max-w-3xl mx-auto"><h1 class="text-4xl text-white font-bold mb-4">关于微风网络</h1><p>Breeze Network 的理念非常简单：提供稳定、简单、透明的网络连接服务。</p></div></section>'
  },
  {
    path: 'src/pages/contact.astro',
    title: '联系我们 - 微风网络 Breeze Network',
    desc: '联系 Breeze Network 微风网络获取支持。',
    h1: '联系我们',
    content: '<section class="py-20 px-4 text-center"><h1 class="text-4xl text-white font-bold mb-4">联系我们</h1><p>Email Support: support@breezenetwork.org</p></section>'
  },
  {
    path: 'src/pages/help.astro',
    title: '帮助中心 - 微风网络 Breeze Network',
    desc: '微风网络帮助中心，解决您的使用、网络和配置问题。',
    h1: '帮助中心',
    content: '<section class="py-20 px-4 text-center"><h1 class="text-4xl text-white font-bold mb-4">帮助中心</h1><p>输入问题以搜索指南。</p></section>'
  },
  {
    path: 'src/pages/privacy.astro',
    title: '隐私政策 - 微风网络 Breeze Network',
    desc: 'Breeze Network 隐私政策说明。',
    h1: '隐私政策',
    content: '<section class="py-20 px-4"><div class="max-w-3xl mx-auto"><h1 class="text-4xl text-white font-bold mb-4">隐私政策</h1><p>我们非常重视您的隐私保护...</p></div></section>'
  },
  {
    path: 'src/pages/terms.astro',
    title: '服务条款 - 微风网络 Breeze Network',
    desc: 'Breeze Network 服务条款。',
    h1: '服务条款',
    content: '<section class="py-20 px-4"><div class="max-w-3xl mx-auto"><h1 class="text-4xl text-white font-bold mb-4">服务条款</h1><p>使用本服务即表示您同意以下条款...</p></div></section>'
  },
  {
    path: 'src/pages/refund.astro',
    title: '退款政策 - 微风网络 Breeze Network',
    desc: 'Breeze Network 退款政策与服务说明。',
    h1: '退款政策',
    content: '<section class="py-20 px-4"><div class="max-w-3xl mx-auto"><h1 class="text-4xl text-white font-bold mb-4">退款政策</h1><p>关于退款的详细规定...</p></div></section>'
  },
  {
    path: 'src/pages/404.astro',
    title: '页面未找到 - 微风网络 Breeze Network',
    desc: '您访问的页面不存在。',
    h1: '404 - 页面迷路了',
    content: '<section class="py-32 px-4 text-center"><h1 class="text-4xl text-white font-bold mb-4">Looks like this connection drifted away.</h1><a href="/" class="text-breeze-blue mt-4 inline-block">返回首页</a></section>'
  },
  {
    path: 'src/pages/airport-recommendation.astro',
    title: '2026机场推荐｜稳定机场、专线机场与高性价比机场怎么选 - 微风网络',
    desc: '2026机场推荐指南，从稳定性、价格、线路、客户端支持与使用场景出发，介绍稳定机场、专线机场、便宜机场以及 Clash 用户选择网络服务时需要注意的关键因素。',
    h1: '2026 机场推荐：稳定机场、专线机场与不同套餐怎么选？',
    content: '<section class="py-20 px-4"><article class="max-w-4xl mx-auto prose prose-invert"><h1 class="text-4xl text-white font-bold mb-8">2026 机场推荐：稳定机场、专线机场与不同套餐怎么选？</h1><p>在寻找2026年的网络连接方案时，很多人会搜索“机场推荐”。但如何判断一个服务是否值得选择？本文将带你了解稳定机场、专线机场的区别...</p><h2>直连 / 中转 / IPLC / IEPL 区别</h2><p>不同线路直接决定了网络稳定性...</p><p>进一步了解 <a href="/pricing">Breeze Network 套餐</a>。</p></article></section>'
  },
  {
    path: 'src/pages/ladder-recommendation.astro',
    title: '2026梯子推荐｜稳定好用的电脑与手机网络工具怎么选 - 微风网络',
    desc: '整理2026梯子推荐知识，分析电脑与手机科学上网工具的区别，帮助用户判断稳定梯子、便宜梯子与梯子软件应该怎么选。',
    h1: '2026 梯子推荐：电脑与手机网络工具怎么选择？',
    content: '<section class="py-20 px-4"><article class="max-w-4xl mx-auto prose prose-invert"><h1 class="text-4xl text-white font-bold mb-8">2026 梯子推荐：电脑与手机网络工具怎么选择？</h1><p>选择合适的梯子不仅仅是选择一个服务商，还要配合正确的软件...</p></article></section>'
  },
  {
    path: 'src/pages/clash-airport.astro',
    title: 'Clash机场推荐｜2026适合Clash与Clash Verge的稳定机场选择 - 微风网络',
    desc: '详细讲解 Clash 是什么，以及如何选择适合 Clash、Clash Verge 等客户端的稳定机场推荐节点。',
    h1: 'Clash 机场推荐：2026 Clash 用户应该如何选择稳定节点？',
    content: '<section class="py-20 px-4"><article class="max-w-4xl mx-auto prose prose-invert"><h1 class="text-4xl text-white font-bold mb-8">Clash 机场推荐：2026 Clash 用户应该如何选择稳定节点？</h1><p>Clash 及其衍生版本（如 Clash Verge）是目前最强大的代理客户端之一...</p></article></section>'
  },
  {
    path: 'src/pages/cheap-airport.astro',
    title: '便宜机场推荐｜高性价比网络服务怎么选？ - 微风网络',
    desc: '预算有限如何选择便宜机场？解析高性价比机场的优缺点及适用场景。',
    h1: '便宜机场推荐：高性价比与稳定性的平衡',
    content: '<section class="py-20 px-4"><article class="max-w-4xl mx-auto prose prose-invert"><h1 class="text-4xl text-white font-bold mb-8">便宜机场推荐：高性价比与稳定性的平衡</h1><p>不一定非要高价才能获得好服务...</p></article></section>'
  },
  {
    path: 'src/pages/dedicated-line.astro',
    title: '专线机场推荐｜IPLC与IEPL稳定专线解析 - 微风网络',
    desc: '深挖专线机场推荐，解析 IPLC 与 IEPL 专线的优势，为对稳定性有极高要求的用户提供指南。',
    h1: '专线机场推荐：为什么游戏和高要求场景需要 IPLC/IEPL？',
    content: '<section class="py-20 px-4"><article class="max-w-4xl mx-auto prose prose-invert"><h1 class="text-4xl text-white font-bold mb-8">专线机场推荐：为什么游戏和高要求场景需要 IPLC/IEPL？</h1><p>专线意味着物理直连，无视晚高峰拥堵...</p></article></section>'
  }
];

pages.forEach(page => {
  write(page.path, `
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="${page.title}" description="${page.desc}">
  ${page.content}
</Layout>
`);
});

// Create favicon and robots.txt
write('public/robots.txt', `
User-agent: *
Allow: /
Sitemap: https://breezenetwork.org/sitemap-index.xml
`);

write('public/favicon.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6"><path d="M12 2L2 7l10 5 10-5-10-5zm0 10l-10-5v10l10 5 10-5V7l-10 5z"/></svg>
`);

console.log('Scaffolding completed.');
