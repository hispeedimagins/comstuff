function immutableAccessor(obj, ...keys) {
    if (!obj) return {};
    if (keys.length === 1) return obj[keys[0]];
    return keys.reduce((res, key) => {
        //console.log(obj);
        //console.log(keys);
        //console.log(res);
        //console.log(key);
        //console.log("ans is "+ obj[key]);
        res[key] = obj[key];
        return res;
    }, {});
}

function objAccessor(obj, ...keys) {
    if (!obj) return {};
    if (keys.length === 1) return obj[keys[0]];
    return keys.reduce((res, key) => {
        res[key] = obj[key];
        return res;
    }, {});
}