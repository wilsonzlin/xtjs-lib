import path from 'path';

export default (p: string) => p.slice(p.lastIndexOf(path.sep) + 1).lastIndexOf('.');
