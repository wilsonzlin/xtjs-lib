export default <T extends {}, K extends keyof T> (obj: T, ...keys: K[]): T[K][] => keys.map(k => obj[k])
