/**
 * Someday, this is going to be a wonderful, complex cloning algorithm.
 * Today is not that day.
 */

var serializeEntity = function(entity) {
  var clone = {};

  var val;
  for (var prop in entity) {
    val = entity[prop];

    if (typeof val === 'function' || (typeof val === 'object' && val !== null)) {
      // someday, something nicer
      // until then, [object Array]
      clone[prop] = {}.toString(val);
    } else {
      // at this point it's just primitives, so copy that value~
      clone[prop] = val;
    }
  }

  clone.displayName = entity.displayName || entity.constructor.name;

  return clone;
};

module.exports = serializeEntity;
