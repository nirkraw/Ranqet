export const clearEndpointCache = (fn, args) => {
    const cacheID = JSON.stringify(fn.name) + JSON.stringify(...args);
    localStorage.removeItem(cacheID);
    
}

