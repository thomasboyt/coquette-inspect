/**
 * This method does two things:
 * 1. If entity.create was not already patched, patches it to generate and store a UUID on new
 *    entities
 * 2. If entity.create was not already patched, generates a UUID for each existing entity
 */

var uuid = require('uuid');

var patchEntities = function(c) {
  if (c.entities.__inspect_patched__) {
    // Was already patched
    return;
  }

  // Patch over existing create method
  var origCreate = c.entities.create;
  c.entities.create = function() {
    var entity = origCreate.apply(this, arguments);
    entity.__inspect_uuid__ = uuid.v1();
    return entity;
  };

  // Add uuids to existing entities
  c.entities.all().forEach(function(entity) {
    entity.__inspect_uuid__ = uuid.v1();
  });

  c.entities.__inspect_patched__ = true;
};

module.exports = patchEntities;
