const l = localStorage;
const getItem = (key) => {
    const item = l.getItem(key);
    if(item){
        return JSON.parse(item);
    }
    return false;
}
const saveItem = (key, value) => {
    return l.setItem(key, JSON.stringify(value));
}
export const cacheService = { getItem, saveItem};