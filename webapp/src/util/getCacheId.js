export const getCacheId = (fn, args) =>
  JSON.stringify(fn.name) + JSON.stringify(...args);
