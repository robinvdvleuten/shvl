exports.get = function (obj, path, def) {
  return (obj = (path.split ? path.split('.') : path).reduce(function (obj, p) {
    return obj && obj[p]
  }, obj)) === undefined ? def : obj;
};

exports.set = function (obj, path, val) {
  return (path = path.split ? path.split('.') : path).slice(0, -1).reduce(function (obj, p) {
    return obj[p] = obj[p] || {};
  }, obj)[path.pop()] = val;
};
