var cloneValue = function(val, seen, blacklist) {

  /* Functions */
  if (typeof val === 'function') {
    return undefined;  // TODO: there's a use case for serializing these into [object Function],
                       // maybe just do this filtering UI-side
  }

  /* Arrays */
  if (Array.isArray(val)) {
    if (seen.has(val)) {
      return '[[Circular reference]]';
    }

    seen.set(val, true);
    return cloneArray(val, seen, blacklist);
  }

  /* Objects */
  if (typeof val === 'object' && val !== null) {
    // don't serialize the Coquette object, which is often stored on entities
    if (val === window.__coquette__) {
      return '[[Coquette namespace]]';
    }
    if (seen.has(val)) {
      return '[[Circular reference]]';
    }
    if (blacklist.has(val)) {
      return '[[Entity ' + val.displayName + ']]';
    }

    if (val instanceof HTMLElement) {
      return '[' + val.toString() + ']';
    }

    seen.set(val, true);
    return cloneObject(val, seen, blacklist);
  }

  /* Primitives */
  return val;
};

var cloneArray = function(arr, seen, blacklist) {
  var clone = arr.map(function(val) {
    return cloneValue(val, seen, blacklist);
  });

  return clone;
};

var cloneObject = function(obj, seen, blacklist) {
  var clone = {};

  for (var key in obj) {
    clone[key] = cloneValue(obj[key], seen, blacklist);
  }

  return clone;
};

var serializeEntity = function(entity, entities) {
  var entitiesMap = new WeakMap();
  // Chrome doesn't support WeakMap(iterable) yet :(
  entities.forEach((entity) => {
    entitiesMap.set(entity, null);
  });

  var seenMap = new WeakMap();

  var clone = cloneObject(entity, seenMap, entitiesMap);

  clone.displayName = entity.displayName || entity.constructor.name;

  return clone;
};

module.exports = serializeEntity;
