const fs = require('fs');
const path = require('path');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir('src/data');
ensureDir('src/components/status');
ensureDir('src/pages');

// 1. Data file
const dataContent = `export const statusData = {
  services: [
    { id: 'hk', name: 'Hong Kong Edge', desc: '香港高速节点集群', baseLat: 38, range: [20, 65] },
    { id: 'jp', name: 'Japan Edge', desc: '日本直连与中转集群', baseLat: 55, range: [35, 90] },
    { id: 'sg', name: 'Singapore Edge', desc: '新加坡流媒体解锁集群', baseLat: 42, range: [20, 70] },
    { id: 'us', name: 'US Edge', desc: '美国大带宽节点集群', baseLat: 160, range: [120, 220] },
    { id: 'sub', name: 'Subscription Service', desc: '微风订阅服务', baseLat: 15, range: [10, 30] },
    { id: 'web', name: 'Website', desc: '微风官方网站', baseLat: 10, range: [5, 20] },
    { id: 'conf', name: 'Configuration Delivery', desc: '配置分发服务', baseLat: 25, range: [15, 40] },
    { id: 'clash', name: 'Clash Configuration', desc: 'Clash / Mihomo 配置服务', baseLat: 22, range: [15, 40] }
  ],
  incidents: [
    {
      date: 'Sep 20',
      title: 'Japan Edge latency degradation',
      status: 'Resolved',
      duration: '14 minutes',
      desc: 'We investigated an issue causing increased latency in our Japan edge locations. Traffic was successfully rerouted.'
    },
    {
      date: 'Sep 16',
      title: 'Subscription service maintenance',
      status: 'Resolved',
      duration: '8 minutes',
      desc: 'Routine database optimization for the subscription delivery network.'
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
        <span id="overall-status-text">All Systems Operational</span>
      </h2>
      <p class="text-gray-400">所有核心服务运行正常。微风网络正在持续监测全球网络节点与核心服务运行情况。</p>
    </div>
    
    <div class="flex flex-col items-start md:items-end text-sm text-gray-500 font-mono bg-[#0B1628] rounded-xl px-5 py-3 border border-gray-800">
      <div class="flex items-center gap-2 mb-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Last checked: <span id="last-checked-timer" class="text-breeze-cyan font-bold">0</span> seconds ago</span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        <span>Auto refresh: <span class="text-green-400">ON</span></span>
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
      <p class="text-xs text-gray-500">{service.desc}</p>
    </div>
    <div class="status-dot w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-colors duration-500"></div>
  </div>
  
  <div class="mt-auto flex items-center justify-between">
    <div class="status-text text-sm font-medium text-green-400 transition-colors duration-500">Operational</div>
    <div class="flex items-center gap-2 text-xs font-mono text-gray-500">
      <span class="latency-val text-gray-300">-- ms</span>
      <span class="text-gray-700">|</span>
      <span class="checked-time">Just now</span>
    </div>
  </div>
</div>`;
fs.writeFileSync('src/components/status/ServiceStatusCard.astro', cardContent);

// 4. UptimeTimeline Component
const uptimeContent = `---
const regions = [
  { name: 'Hong Kong', uptime: '99.98%' },
  { name: 'Singapore', uptime: '99.97%' },
  { name: 'Japan', uptime: '99.95%' },
  { name: 'US', uptime: '99.92%' }
];

const generateDays = () => {
  return Array.from({length: 90}).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    const rand = Math.random();
    let status = 'operational';
    let msg = 'No incidents';
    if(rand > 0.98) { status = 'disruption'; msg = '1 major incident'; }
    else if(rand > 0.94) { status = 'degraded'; msg = '1 minor incident'; }
    return { 
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
      status, 
      msg 
    };
  });
};
---
<div class="bg-[#131F33] border border-white/5 rounded-3xl p-8 mb-12">
  <h3 class="text-xl font-bold text-white mb-6">90 Days Uptime</h3>
  
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
                    <div class="text-gray-400">{region.uptime} uptime</div>
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
      Live Activity
    </h3>
    <span class="text-xs text-gray-500 font-mono">Stream connected</span>
  </div>
  
  <div id="activity-stream" class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 relative">
    <!-- Events injected by JS -->
    <div class="absolute inset-0 flex items-center justify-center text-gray-500 text-sm" id="activity-empty">
      Waiting for events...
    </div>
  </div>
</div>`;
fs.writeFileSync('src/components/status/LiveActivity.astro', activityContent);

// 6. IncidentHistory Component
const incidentContent = `---
import { statusData } from '../../data/status';
---
<div class="bg-[#131F33] border border-white/5 rounded-3xl p-8 h-full">
  <h3 class="text-xl font-bold text-white mb-6">Recent Incidents</h3>
  
  {statusData.incidents.length === 0 ? (
    <div class="text-gray-400 text-sm italic">No incidents reported today.</div>
  ) : (
    <div class="space-y-8">
      {statusData.incidents.map(inc => (
        <div class="border-l-2 border-gray-700 pl-4 relative">
          <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-500 ring-4 ring-[#131F33]"></div>
          <div class="text-xs text-gray-500 mb-1">{inc.date}</div>
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
    Scheduled Maintenance
  </h3>
  
  {statusData.maintenance.length === 0 ? (
    <div class="text-gray-400 text-sm italic">No scheduled maintenance.</div>
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
        <h3 class="text-white font-bold mb-6 text-xl">Global Network Health</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">Asia Network</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">Operational</span>
          </div>
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">Global Network</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">Operational</span>
          </div>
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">Subscription Infra</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">Operational</span>
          </div>
          <div class="bg-[#131F33] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
            <span class="text-sm text-gray-300 font-medium">Website Infra</span>
            <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-mono">Operational</span>
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
        * Status visualization demo. Data shown is simulated for demonstration purposes.
      </div>

    </div>
  </main>

  <script>
    // Status Engine - DEMO MODE
    // Ensure all logic runs on client
    document.addEventListener('DOMContentLoaded', () => {
      // Configuration extracted from data
      const services = [
        { id: 'hk', name: 'Hong Kong Edge', baseLat: 38, range: [20, 65] },
        { id: 'jp', name: 'Japan Edge', baseLat: 55, range: [35, 90] },
        { id: 'sg', name: 'Singapore Edge', baseLat: 42, range: [20, 70] },
        { id: 'us', name: 'US Edge', baseLat: 160, range: [120, 220] },
        { id: 'sub', name: 'Subscription Service', baseLat: 15, range: [10, 30] },
        { id: 'web', name: 'Website', baseLat: 10, range: [5, 20] },
        { id: 'conf', name: 'Configuration Delivery', baseLat: 25, range: [15, 40] },
        { id: 'clash', name: 'Clash Configuration', baseLat: 22, range: [15, 40] }
      ];

      // Global State
      let lastCheckedMs = Date.now();
      const stateMap = new Map(); // id -> { status: 'operational', timerId, lastCheck }
      
      // Elements
      const timerEl = document.getElementById('last-checked-timer');
      const activityStream = document.getElementById('activity-stream');
      const activityEmpty = document.getElementById('activity-empty');
      const overallDot = document.getElementById('overall-status-dot');
      const overallText = document.getElementById('overall-status-text');

      // Styles mapping
      const styles = {
        operational: { text: 'Operational', colorClass: 'text-green-400', bgClass: 'bg-green-500', shadow: 'shadow-[0_0_8px_rgba(34,197,94,0.5)]', border: 'border-gray-800' },
        degraded: { text: 'Degraded Performance', colorClass: 'text-yellow-400', bgClass: 'bg-yellow-500', shadow: 'shadow-[0_0_12px_rgba(234,179,8,0.7)]', border: 'border-yellow-600/50' },
        disruption: { text: 'Service Disruption', colorClass: 'text-red-400', bgClass: 'bg-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.8)]', border: 'border-red-600/50' }
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
        
        // Trigger animation
        requestAnimationFrame(() => {
          el.classList.remove('opacity-0', 'translate-x-4');
        });

        // Keep only last 10
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
        
        // Remove old classes
        dot.className = \`status-dot w-3 h-3 rounded-full transition-colors duration-500 \${style.bgClass} \${style.shadow}\`;
        text.className = \`status-text text-sm font-medium transition-colors duration-500 \${style.colorClass}\`;
        card.className = \`service-card bg-[#0B1628] border rounded-2xl p-6 transition-all duration-500 flex flex-col h-full \${style.border}\`;
        
        text.innerText = style.text;
        lat.innerText = latencyStr;
        checked.innerText = 'Just now';
      };

      const computeGlobalStatus = () => {
        let hasDisruption = false;
        let hasDegraded = false;
        
        stateMap.forEach((val) => {
          if(val.status === 'disruption') hasDisruption = true;
          if(val.status === 'degraded') hasDegraded = true;
        });

        if(hasDisruption) {
          overallText.innerText = 'Service Disruption';
          overallDot.className = 'w-4 h-4 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] motion-safe:animate-pulse';
        } else if(hasDegraded) {
          overallText.innerText = 'Degraded Performance';
          overallDot.className = 'w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.6)] motion-safe:animate-pulse';
        } else {
          overallText.innerText = 'All Systems Operational';
          overallDot.className = 'w-4 h-4 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] motion-safe:animate-pulse';
        }
      };

      const processService = (srv) => {
        if(document.hidden) {
          // Pause processing when tab is inactive
          scheduleNext(srv);
          return;
        }

        const state = stateMap.get(srv.id);
        const rand = Math.random();
        let nextStatus = 'operational';
        let latencyStr = '';

        if(state.status === 'operational') {
          // Chance to degrade
          if(rand > 0.95) {
            nextStatus = 'disruption';
          } else if(rand > 0.85) {
            nextStatus = 'degraded';
          }
        } else {
          // Very high chance to recover
          if(rand > 0.2) {
            nextStatus = 'operational';
          } else {
            nextStatus = state.status; // remain
          }
        }

        // Generate latency
        if(nextStatus === 'operational') {
          const lat = Math.floor(Math.random() * (srv.range[1] - srv.range[0])) + srv.range[0];
          latencyStr = lat + ' ms';
        } else if (nextStatus === 'degraded') {
          const lat = srv.range[1] + Math.floor(Math.random() * 100);
          latencyStr = lat + ' ms (High)';
        } else {
          const errors = ['Timeout', 'Packet Loss', 'Interrupted'];
          latencyStr = errors[Math.floor(Math.random()*errors.length)];
        }

        // Apply changes
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
          // 20s to 70s
          delayMs = 20000 + Math.random() * 50000;
        } else if(currentStatus === 'degraded') {
          // 8s to 20s
          delayMs = 8000 + Math.random() * 12000;
        } else {
          // 10s to 30s
          delayMs = 10000 + Math.random() * 20000;
        }
        
        state.timerId = setTimeout(() => processService(srv), delayMs);
      };

      // Initialization
      services.forEach(srv => {
        stateMap.set(srv.id, { status: 'operational', timerId: null, lastCheck: Date.now() });
        // Initial random latency
        const lat = Math.floor(Math.random() * (srv.range[1] - srv.range[0])) + srv.range[0];
        updateCardDOM(srv.id, 'operational', lat + ' ms');
        scheduleNext(srv);
      });

      // Global timer updates
      setInterval(() => {
        if(!document.hidden) {
          const diffSec = Math.floor((Date.now() - lastCheckedMs) / 1000);
          if(timerEl) timerEl.innerText = diffSec;
          
          // Update "checked X sec ago" for individual cards loosely
          services.forEach(srv => {
            const state = stateMap.get(srv.id);
            const card = document.getElementById(\`service-\${srv.id}\`);
            if(card) {
              const checked = card.querySelector('.checked-time');
              const sec = Math.floor((Date.now() - state.lastCheck) / 1000);
              if(sec === 0) checked.innerText = 'Just now';
              else checked.innerText = sec + 's ago';
            }
          });
        }
      }, 1000);
    });
  </script>
</Layout>`;
fs.writeFileSync('src/pages/status.astro', pageContent);

console.log("Status page scaffolding complete.");
