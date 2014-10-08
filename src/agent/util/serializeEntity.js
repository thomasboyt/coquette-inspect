var cloneValue = function(val, seen) {

  /* Functions */
  if (typeof val === 'function') {
    return undefined;  // TODO: there's a use case for serializing these into [object Function],
                       // maybe just do this filtering UI-side
  }

  /* Arrays */
  if (Array.isArray(val)) {
    if (seen.has(val)) {
      // TODO: this isn't really an accurate label, since it can also be a reference to another
      // entity. Maybe something like [[hidden]] ?
      return '[[Circular reference]]';
    }

    seen.set(val, true);
    return cloneArray(val, seen);
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
      return cloneObject(val, seen);
    }

    // e.g. [object Foo], hopefully?
    return val.toString();
  }

  /* Primitives */
  return val;
};

var cloneArray = function(arr, seen) {
  seen = seen || new WeakMap();

  var clone = arr.map(function(val) {
    return cloneValue(val, seen);
  });

  return clone;
};

var cloneObject = function(obj, seen) {
  var clone = {};
  seen = seen || new WeakMap();

  for (var key in obj) {
    clone[key] = cloneValue(obj[key], seen);
  }

  return clone;
};

var serializeEntity = function(entity, entities) {
  var entitiesMap = new WeakMap();
  entities.forEach((entity) => {
    entitiesMap.set(entity, null);
  });

  var clone = cloneObject(entity, entitiesMap);

  clone.displayName = entity.displayName || entity.constructor.name;

  return clone;
};

module.exports = serializeEntity;
