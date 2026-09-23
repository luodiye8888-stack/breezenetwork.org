export const statusData = {
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
};