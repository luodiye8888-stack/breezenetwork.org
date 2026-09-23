export interface StatusConfigItem {
  name: string;
  url: string;
}

export const statusConfig: StatusConfigItem[] = [
  { name: "微风网络官网", url: "/" },
  { name: "套餐与服务", url: "/pricing" },
  { name: "线路与节点", url: "/network" },
  { name: "帮助中心", url: "/help" },
  { name: "使用教程", url: "/guides" }
];

export const statusThresholds = {
  degraded: 800, // ms
  disrupted: 2000, // ms
  timeout: 5000 // ms
};