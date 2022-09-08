export const notEmpty = <T>(item: T) => {
    if(typeof item === 'undefined') return false;
    if(typeof item === 'string') return item.length > 0;
   if(typeof item === 'object') return Object.keys(item).length > 0;
   if(Array.isArray(item)) return item.length > 0;
   return true
}