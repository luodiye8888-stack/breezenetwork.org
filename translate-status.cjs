const fs = require('fs');
const path = require('path');

// 1. Data file
const dataContent = `export const statusData = {
  services: [
    { id: 'hk', name: '香港节点集群', desc: 'Hong Kong Edge', baseLat: 38, range: [20, 65] },
    { id: 'jp', name: '日本节点集群', desc: 'Japan Edge', baseLat: 55, range: [35, 90] },
    { id: 'sg', name: '新加坡节点集群', desc: 'Singapore Edge', baseLat: 42, range: [20, 70] },
    { id: 'us', name: '美国节点集群', desc: 'US Edge', baseLat: 160, range: [120, 220] },
    { id: 'sub', name: '订阅分发服务', desc: 'Subscription Service', baseLat: 15, range: [10, 30] },
    { id: 'web', name: '官方网站系统', desc: 'Official Website', baseLat: 10, range: [5, 20] },
    { id: 'conf', name: '配置下发引擎', desc: 'Configuration Delivery', baseLat: 25, range: [15, 40] },
    { id: 'clash', name: 'Clash 规则引擎', desc: 'Routing Rules Service', baseLat: 22, range: [15, 40] }
  ],
  incidents: [
    {
      date: '9月 20日',
      title: '日本节点集群高延迟预警',
      status: '已修复',
      duration: '历时 14 分钟',
      desc: '我们监测到日本边缘节点出现路由拥堵导致的延迟升高。流量已被成功调度至备用路由。'
    },
    {
      date: '9月 16日',
      title: '订阅服务例行维护',
      status: '已完成',
      duration: '历时 8 分钟',
      desc: '对订阅分发网络的底层数据库进行了例行性能优化。'
    }
  ],
  maintenance: []
};`;
fs.writeFileSync('src/data/status.ts', dataContent);

// 2. StatusOverview Component
const overviewContent = `---
---
<div class="bg-[#131F33] border border-white/5 rounded-3xl p-8 md:p-12 shadow-xl mb-12 relative overflow-hidden">
  <div class="absolute top-0 right-0 w-64 h-64 bg-breeze-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
  
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
    <div>
      <h2 class="text-3xl font-bold text-white mb-2 flex items-center gap-4">
        <span id="overall-status-dot" class="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] motion-safe:animate-pulse"></span>
        <span id="overall-status-text">所有系统运行正常</span>
      </h2>
      <p class="text-gray-400">微风网络正在持续监测全球网络节点与核心服务运行情况。</p>
    </div>
    
    <div class="flex flex-col items-start md:items-end text-sm text-gray-500 font-mono bg-[#0B1628] rounded-xl px-5 py-3 border border-gray-800">
      <div class="flex items-center gap-2 mb-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>上次检测: <span id="last-checked-timer" class="text-breeze-cyan font-bold">0</span> 秒前</span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        <span>自动刷新: <span class="text-green-400">已开启</span></span>
      </div>
    </div>
  </div>
</div>`;
fs.writeFileSync('src/components/status/StatusOverview.astro', overviewContent);

// 3. ServiceStatusCard Component
const cardContent = `---
const { service } = Astro.props;
---
<div id={\`service-\${service.id}\`} class="service-card bg-[#0B1628] border border-gray-800 rounded-2xl p-6 transition-all duration-500 hover:border-gray-600 flex flex-col h-full" data-service-id={service.id}>
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="text-lg font-bold text-white mb-1">{service.name}</h3>
      <p class="text-xs text-gray-500 font-mono">{service.desc}</p>
    </div>
    <div class="status-dot w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-colors duration-500"></div>
  </div>
  
  <div class="mt-auto flex items-center justify-between">
    <div class="status-text text-sm font-medium text-green-400 transition-colors duration-500">运行正常</div>
    <div class="flex items-center gap-2 text-xs font-mono text-gray-500">
      <span class="latency-val text-gray-300">-- ms</span>
      <span class="text-gray-700">|</span>
      <span class="checked-time">刚刚</span>
    </div>
  </div>
</div>`;
fs.writeFileSync('src/components/status/ServiceStatusCard.astro', cardContent);

// 4. UptimeTimeline Component
const uptimeContent = `---
const regions = [
  { name: '香港节点集群', uptime: '99.98%' },
  { name: '新加坡节点集群', uptime: '99.97%' },
  { name: '日本节点集群', uptime: '99.95%' },
  { name: '美国节点集群', uptime: '99.92%' }
];

const generateDays = () => {
  return Array.from({length: 90}).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    const rand = Math.random();
    let status = 'operational';
    let msg = '无异常报告';
    if(rand > 0.98) { status = 'disruption'; msg = '发生 1 次服务中断'; }
    else if(rand > 0.94) { status = 'degraded'; msg = '发生 1 次性能下降'; }
    return { 
      date: (date.getMonth() + 1) + '月' + date.getDate() + '日', 
      status, 
      msg 
    };
  });
};
---
<div class="bg-[#131F33] border border-white/5 rounded-3xl p-8 mb-12">
  <h3 class="text-xl font-bold text-white mb-6">过去 90 天可用性</h3>
  
  <div class="space-y-6">
    {regions.map(region => {
      const days = generateDays();
      return (
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-300">{region.name}</span>
            <span class="text-sm font-mono text-breeze-cyan">{region.uptime}</span>
          </div>
          <div class="w-full overflow-x-auto custom-scrollbar pb-2">
            <div class="flex gap-1 min-w-[600px]">
              {days.map(day => (
                <div class="group relative flex-1 h-8 rounded-sm bg-green-500/80 hover:opacity-80 transition-opacity cursor-pointer"
                  style={\`\${day.status === 'degraded' ? 'background-color: #EAB308;' : day.status === 'disruption' ? 'background-color: #EF4444;' : ''}\`}
                >
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 border border-gray-700 pointer-events-none shadow-xl">
                    <div class="font-bold mb-1">{day.date}</div>
                    <div class="text-gray-400">{region.uptime} 可用率</div>
                    <div class={\`\${day.status === 'operational' ? 'text-green-400' : day.status === 'degraded' ? 'text-yellow-400' : 'text-red-400'}\`}>{day.msg}</div>
                    <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>`;
fs.writeFileSync('src/components/status/UptimeTimeline.astro', uptimeContent);

// 5. LiveActivity Component
const activityContent = `---
---
<div class="bg-[#131F33] border border-white/5 rounded-3xl p-8 flex flex-col h-[400px]">
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-xl font-bold text-white flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-breeze-cyan animate-pulse"></span>
      实时监控动态
    </h3>
    <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">事件流已连接</span>
  </div>
  
  <div id="activity-stream" class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 relative">
    <!-- Events injected by JS -->
    <div class="absolute inset-0 flex items-center justify-center text-gray-500 text-sm" id="activity-empty">
      等待监控事件...
    </div>
  </div>
</div>`;
fs.writeFileSync('src/components/status/LiveActivity.astro', activityContent);

// 6. IncidentHistory Component
const incidentContent = `---
import { statusData } from '../../data/status';
---
<div class="bg-[#131F33] border border-white/5 rounded-3xl p-8 h-full">
  <h3 class="text-xl font-bold text-white mb-6">近期事故通报</h3>
  
  {statusData.incidents.length === 0 ? (
    <div class="text-gray-400 text-sm italic">今日暂无异常事故报告。</div>
  ) : (
    <div class="space-y-8">
      {statusData.incidents.map(inc => (
        <div class="border-l-2 border-gray-700 pl-4 relative">
          <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-500 ring-4 ring-[#131F33]"></div>
          <div class="text-xs text-gray-500 mb-1 font-mono">{inc.date}</div>
          <h4 class="text-white font-bold mb-2">{inc.title}</h4>
          <div class="text-xs font-medium text-gray-400 mb-2 flex items-center gap-2">
            <span class="text-green-400 bg-green-400/10 px-2 py-0.5 rounded">{inc.status}</span>
            <span>·</span>
            <span>{inc.duration}</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">{inc.desc}</p>
        </div>
      ))}
    </div>
  )}
</div>`;
fs.writeFileSync('src/components/status/IncidentHistory.astro', incidentContent);

// 7. MaintenancePanel Component
const maintenanceContent = `---
import { statusData } from '../../data/status';
---
<div class="bg-[#131F33] border border-white/5 rounded-3xl p-8 h-full">
  <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    计划内维护
  </h3>
  
  {statusData.maintenance.length === 0 ? (
    <div class="text-gray-400 text-sm italic">近期暂无计划内维护安排。</div>
  ) : (
    <div class="space-y-4">
      {statusData.maintenance.map(m => (
        <div class="bg-gray-800/50 rounded-xl p-4">
          <div class="text-sm font-bold text-white mb-1">{m.title}</div>
          <div class="text-xs text-gray-400">{m.date}</div>
        </div>
      ))}
    </div>
  )}
</div>`;
fs.writeFileSync('src/components/status/MaintenancePanel.astro', maintenanceContent);

// 8. Main Page status.astro
const pageContent = `---
import Layout from '../layouts/Layout.astro';
import { statusData } from '../data/status';
import StatusOverview from '../components/status/StatusOverview.astro';
import ServiceStatusCard from '../components/status/ServiceStatusCard.astro';
import UptimeTimeline from '../components/status/UptimeTimeline.astro';
import LiveActivity from '../components/status/LiveActivity.astro';
import IncidentHistory from '../components/status/IncidentHistory.astro';
import MaintenancePanel from '../components/status/MaintenancePanel.astro';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://breezenetwork.org/" },
    { "@type": "ListItem", "position": 2, "name": "Status", "item": "https://breezenetwork.org/status" }
  ]
};
---

<Layout 
  title="微风网络运行状态 | Breeze Network Status" 
  description="查看微风网络全球节点、订阅服务与核心网络基础设施的实时运行状态、延迟与服务可用性。"
  canonical="https://breezenetwork.org/status"
>
  <head slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </head>

  <main class="min-h-screen pt-32 pb-20 px-4 bg-breeze-dark">
    <div class="max-w-7xl mx-auto">
      
      <h1 class="sr-only">微风网络实时运行状态</h1>
      
      <StatusOverview />

      <!-- Global Network Health -->
      <div class="mb-12">
        <h3 class="text-white font-bold mb-6 text-xl">全球网络健康状态</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">亚洲边缘网络</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">正常</span>
          </div>
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">全球骨干网络</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">正常</span>
          </div>
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">订阅分发系统</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">正常</span>
          </div>
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">官网基础设施</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">正常</span>
          </div>
        </div>
      </div>

      <!-- Service Status Grid -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statusData.services.map(service => (
            <ServiceStatusCard service={service} />
          ))}
        </div>
      </div>

      <UptimeTimeline />

      <!-- Bottom Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <LiveActivity />
        </div>
        <div class="lg:col-span-1">
          <IncidentHistory />
        </div>
        <div class="lg:col-span-1">
          <MaintenancePanel />
        </div>
      </div>
      
      <!-- Demo Disclaimer -->
      <div class="mt-12 text-center text-xs text-gray-600 font-mono">
        * Status visualization demo. 此页面监控数据为随机可视化演示，非真实线上事故。
      </div>

    </div>
  </main>

  <script>
    // Status Engine - DEMO MODE
    document.addEventListener('DOMContentLoaded', () => {
      // Configuration extracted from data
      const services = [
        { id: 'hk', name: '香港节点集群', baseLat: 38, range: [20, 65] },
        { id: 'jp', name: '日本节点集群', baseLat: 55, range: [35, 90] },
        { id: 'sg', name: '新加坡节点集群', baseLat: 42, range: [20, 70] },
        { id: 'us', name: '美国节点集群', baseLat: 160, range: [120, 220] },
        { id: 'sub', name: '订阅分发服务', baseLat: 15, range: [10, 30] },
        { id: 'web', name: '官方网站系统', baseLat: 10, range: [5, 20] },
        { id: 'conf', name: '配置下发引擎', baseLat: 25, range: [15, 40] },
        { id: 'clash', name: 'Clash 规则引擎', baseLat: 22, range: [15, 40] }
      ];

      // Global State
      let lastCheckedMs = Date.now();
      const stateMap = new Map();
      
      // Elements
      const timerEl = document.getElementById('last-checked-timer');
      const activityStream = document.getElementById('activity-stream');
      const activityEmpty = document.getElementById('activity-empty');
      const overallDot = document.getElementById('overall-status-dot');
      const overallText = document.getElementById('overall-status-text');

      // Styles mapping (Translated to Chinese)
      const styles = {
        operational: { text: '运行正常', colorClass: 'text-green-400', bgClass: 'bg-green-500', shadow: 'shadow-[0_0_8px_rgba(34,197,94,0.5)]', border: 'border-gray-800' },
        degraded: { text: '性能下降', colorClass: 'text-yellow-400', bgClass: 'bg-yellow-500', shadow: 'shadow-[0_0_12px_rgba(234,179,8,0.7)]', border: 'border-yellow-600/50' },
        disruption: { text: '服务中断', colorClass: 'text-red-400', bgClass: 'bg-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.8)]', border: 'border-red-600/50' }
      };

      const formatTime = () => {
        const d = new Date();
        return d.getHours().toString().padStart(2, '0') + ':' + 
               d.getMinutes().toString().padStart(2, '0') + ':' + 
               d.getSeconds().toString().padStart(2, '0');
      };

      const logActivity = (name, statusStr) => {
        if(activityEmpty) activityEmpty.style.display = 'none';
        
        const el = document.createElement('div');
        el.className = 'text-sm flex items-start gap-4 p-2 rounded bg-white/5 opacity-0 translate-x-4 transition-all duration-500';
        el.innerHTML = \`
          <span class="text-gray-500 font-mono flex-shrink-0">\${formatTime()}</span>
          <div class="flex-1">
            <span class="text-gray-300 font-medium">\${name}</span>
            <span class="text-gray-500 ml-2">\${statusStr}</span>
          </div>
        \`;
        
        activityStream.insertBefore(el, activityStream.firstChild);
        
        requestAnimationFrame(() => {
          el.classList.remove('opacity-0', 'translate-x-4');
        });

        if(activityStream.children.length > 10) {
          const last = activityStream.lastElementChild;
          if(last && last.id !== 'activity-empty') activityStream.removeChild(last);
        }
      };

      const updateCardDOM = (id, status, latencyStr) => {
        const card = document.getElementById(\`service-\${id}\`);
        if(!card) return;
        
        const dot = card.querySelector('.status-dot');
        const text = card.querySelector('.status-text');
        const lat = card.querySelector('.latency-val');
        const checked = card.querySelector('.checked-time');
        
        const style = styles[status];
        
        dot.className = \`status-dot w-3 h-3 rounded-full transition-colors duration-500 \${style.bgClass} \${style.shadow}\`;
        text.className = \`status-text text-sm font-medium transition-colors duration-500 \${style.colorClass}\`;
        card.className = \`service-card bg-[#0B1628] border rounded-2xl p-6 transition-all duration-500 flex flex-col h-full \${style.border}\`;
        
        text.innerText = style.text;
        lat.innerText = latencyStr;
        // checked updated globally
      };

      const computeGlobalStatus = () => {
        let hasDisruption = false;
        let hasDegraded = false;
        
        stateMap.forEach((val) => {
          if(val.status === 'disruption') hasDisruption = true;
          if(val.status === 'degraded') hasDegraded = true;
        });

        if(hasDisruption) {
          overallText.innerText = '部分系统发生中断';
          overallDot.className = 'w-4 h-4 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] motion-safe:animate-pulse';
        } else if(hasDegraded) {
          overallText.innerText = '部分系统性能下降';
          overallDot.className = 'w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.6)] motion-safe:animate-pulse';
        } else {
          overallText.innerText = '所有系统运行正常';
          overallDot.className = 'w-4 h-4 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] motion-safe:animate-pulse';
        }
      };

      const processService = (srv) => {
        if(document.hidden) {
          scheduleNext(srv);
          return;
        }

        const state = stateMap.get(srv.id);
        const rand = Math.random();
        let nextStatus = 'operational';
        let latencyStr = '';

        if(state.status === 'operational') {
          if(rand > 0.95) nextStatus = 'disruption';
          else if(rand > 0.85) nextStatus = 'degraded';
        } else {
          if(rand > 0.2) nextStatus = 'operational';
          else nextStatus = state.status;
        }

        if(nextStatus === 'operational') {
          const lat = Math.floor(Math.random() * (srv.range[1] - srv.range[0])) + srv.range[0];
          latencyStr = lat + ' ms';
        } else if (nextStatus === 'degraded') {
          const lat = srv.range[1] + Math.floor(Math.random() * 100);
          latencyStr = lat + ' ms (延迟高)';
        } else {
          const errors = ['连接超时', '丢包严重', '连接中断'];
          latencyStr = errors[Math.floor(Math.random()*errors.length)];
        }

        if(state.status !== nextStatus) {
          logActivity(srv.name, styles[nextStatus].text);
        }
        
        state.status = nextStatus;
        state.lastCheck = Date.now();
        lastCheckedMs = Date.now();
        
        updateCardDOM(srv.id, nextStatus, latencyStr);
        computeGlobalStatus();
        
        scheduleNext(srv, nextStatus);
      };

      const scheduleNext = (srv, currentStatus = 'operational') => {
        const state = stateMap.get(srv.id);
        if(state.timerId) clearTimeout(state.timerId);
        
        let delayMs = 0;
        if(currentStatus === 'operational') {
          delayMs = 20000 + Math.random() * 50000;
        } else if(currentStatus === 'degraded') {
          delayMs = 8000 + Math.random() * 12000;
        } else {
          delayMs = 10000 + Math.random() * 20000;
        }
        
        state.timerId = setTimeout(() => processService(srv), delayMs);
      };

      services.forEach(srv => {
        stateMap.set(srv.id, { status: 'operational', timerId: null, lastCheck: Date.now() });
        const lat = Math.floor(Math.random() * (srv.range[1] - srv.range[0])) + srv.range[0];
        updateCardDOM(srv.id, 'operational', lat + ' ms');
        scheduleNext(srv);
      });

      setInterval(() => {
        if(!document.hidden) {
          const diffSec = Math.floor((Date.now() - lastCheckedMs) / 1000);
          if(timerEl) timerEl.innerText = diffSec;
          
          services.forEach(srv => {
            const state = stateMap.get(srv.id);
            const card = document.getElementById(\`service-\${srv.id}\`);
            if(card) {
              const checked = card.querySelector('.checked-time');
              const sec = Math.floor((Date.now() - state.lastCheck) / 1000);
              if(sec === 0) checked.innerText = '刚刚';
              else checked.innerText = sec + ' 秒前';
            }
          });
        }
      }, 1000);
    });
  </script>
</Layout>`;
fs.writeFileSync('src/pages/status.astro', pageContent);

console.log("Translation complete!");
