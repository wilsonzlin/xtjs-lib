export default (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
