const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'pages', 'status.astro');
let content = fs.readFileSync(filePath, 'utf8');

// 1. We need to save latencyStr inside stateMap as well so we can restore it.
content = content.replace(
  /state.status = nextStatus;\s*state.lastCheck = Date\.now\(\);\s*lastCheckedMs = Date\.now\(\);/,
  \`state.status = nextStatus;
          state.latencyStr = latencyStr;
          state.lastCheck = Date.now();
          lastCheckedMs = Date.now();
          sessionStorage.setItem('bz_status_nodes', JSON.stringify(Array.from(stateMap.entries())));
          sessionStorage.setItem('bz_status_time', lastCheckedMs);\`
);

// 2. We need to replace the services.forEach initialization to load from sessionStorage
const initRegex = /services\.forEach\(srv => \{\s*stateMap\.set\(srv\.id, \{ status: 'operational', timerId: null, lastCheck: Date\.now\(\) \}\);\s*const lat = Math\.floor\(Math\.random\(\) \* \(srv\.range\[1\] - srv\.range\[0\]\)\) \+ srv\.range\[0\];\s*updateCardDOM\(srv\.id, 'operational', lat \+ ' ms'\);\s*scheduleNext\(srv\);\s*\}\);/;

const newInit = \`// Load saved state to prevent jumping on refresh
      let savedState = null;
      try {
        const savedTime = sessionStorage.getItem('bz_status_time');
        if(savedTime && (Date.now() - savedTime < 300000)) { // valid for 5 mins
          savedState = new Map(JSON.parse(sessionStorage.getItem('bz_status_nodes')));
          lastCheckedMs = parseInt(savedTime);
        }
      } catch(e) {}

      services.forEach(srv => {
        let status = 'operational';
        let latencyStr = '';
        let lastCheck = Date.now();
        
        if (savedState && savedState.has(srv.id)) {
          const prev = savedState.get(srv.id);
          status = prev.status;
          latencyStr = prev.latencyStr || '...';
          lastCheck = prev.lastCheck;
        } else {
          const lat = Math.floor(Math.random() * (srv.range[1] - srv.range[0])) + srv.range[0];
          latencyStr = lat + ' ms';
        }
        
        stateMap.set(srv.id, { status, latencyStr, timerId: null, lastCheck });
        updateCardDOM(srv.id, status, latencyStr);
        scheduleNext(srv, status);
      });
      
      sessionStorage.setItem('bz_status_nodes', JSON.stringify(Array.from(stateMap.entries())));
      sessionStorage.setItem('bz_status_time', lastCheckedMs);
      computeGlobalStatus();\`;

content = content.replace(initRegex, newInit);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed jumping ms in status.astro');
