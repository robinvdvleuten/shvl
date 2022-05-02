export function get(object, path, def) {
  return (object = (path.split ? path.split('.') : path).reduce(function (obj, p) {
    return obj && obj[p]
  }, object)) === undefined ? def : object;
};

export function set  (object, path, val, obj) {
  return ((path = path.split ? path.split('.') : path.slice(0)).slice(0, -1).reduce(function (obj, p) {
    return (!/^(__proto__|constructor|prototype)$/.test(p))? obj[p] = obj[p] || {} : {};
  }, obj = object)[path.pop()] = val), object;
};
