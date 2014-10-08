/**
 * Someday, this is going to be a wonderful, complex cloning algorithm.
 * Today is not that day.
 */

var cloneValue = function(val, seen) {

  /* Functions */
  if (typeof val === 'function') {
    return '[object Function]';
  }

  /* Arrays */
  if (Array.isArray(val)) {
    if (seen.has(val)) {
      return '[[Circular reference]]';
    }

    seen.set(val, true);
    return dumbArrayClone(val, seen);
  }

  /* Objects */
  if (typeof val === 'object' && val !== null) {
    // TODO: this is a hack to not serialize crazy & non-transportable things like DOM Nodes,
    // needs to be way more fine-grained
    if (val.toString() === '[object Object]') {
      // don't serialize the Coquette object, which is often stored on entities
      if (val === window.__coquette__) {
        return '[[Coquette namespace]]';
      }
      if (seen.has(val)) {
        return '[[Circular reference]]';
      }

      seen.set(val, true);
      return dumbObjClone(val, seen);
    }

    // e.g. [object Foo], hopefully?
    return val.toString();
  }

  /* Primitives */
  return val;
};

var dumbArrayClone = function(arr, seen) {
  seen = seen || new WeakMap();

  var clone = arr.map(function(val) {
    return cloneValue(val, seen);
  });

  return clone;
};

var dumbObjClone = function(obj, seen) {
  var clone = {};
  seen = seen || new WeakMap();

  for (var key in obj) {
    clone[key] = cloneValue(obj[key], seen);
  }

  return clone;
};

var serializeEntity = function(entity) {
  var clone = dumbObjClone(entity);

  clone.displayName = entity.displayName || entity.constructor.name;

  return clone;
};

module.exports = serializeEntity;
