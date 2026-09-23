export interface NetworkRegion {
  region: string;
  code: string;
  description: string;
  statusAvailable: boolean;
}

export const networkRegions: NetworkRegion[] = [
  { region: "香港", code: "HK", description: "低延迟接入点，适合日常浏览与高频交互", statusAvailable: true },
  { region: "日本", code: "JP", description: "优质亚太路由，适合大部分游戏与流媒体", statusAvailable: true },
  { region: "新加坡", code: "SG", description: "东南亚核心枢纽，线路稳定", statusAvailable: true },
  { region: "台湾", code: "TW", description: "原生节点池，特定流媒体解锁首选", statusAvailable: true },
  { region: "美国", code: "US", description: "北美干线直连，大带宽业务支撑", statusAvailable: true }
];
