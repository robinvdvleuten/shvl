export function get(object, path, def) {
  return (object = (path.split ? path.split('.') : path).reduce(function (obj, p) {
    return obj && obj[p]
  }, object)) === undefined ? def : object;
};

// Keys that would let a path escape the target object and reach a shared
// prototype. Compared with === on already-stringified keys so the guard can't
// be bypassed by monkey-patching RegExp.prototype.test or by a stateful
// toString() that returns a different value on each coercion.
function forbidden(key) {
  return key === '__proto__' || key === 'constructor' || key === 'prototype';
}

export function set(object, path, val, key) {
  path = (path.split ? path.split('.') : path.slice(0)).map(String);
  key = path.pop();
  path = path.reduce(function (obj, p) {
    return forbidden(p) ? {} : obj[p] = obj[p] || {};
  }, object);
  (forbidden(key) ? {} : path)[key] = val;
  return object;
};
