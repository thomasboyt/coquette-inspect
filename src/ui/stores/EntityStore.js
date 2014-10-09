var Fluxxor = require('fluxxor');

var deepUpdate = require('../../common/deepUpdate');

var EntityStore = Fluxxor.createStore({
  actions: {
    'didGetEntities': 'onDidGetEntities',
    'didUpdateProperty': 'onDidUpdateProperty'
  },

  initialize: function() {
    this.entities = [];
  },

  onDidGetEntities: function(entities) {
    this.entities = entities;
    this.emit('change');
  },

  onDidUpdateProperty: function(data) {
    var entity = this.entities
      .filter((entity) => entity.__inspect_uuid__ === data.entityId)[0];

    if (!entity) {
      throw new Error('No entity found with id ' + data.entityId);
    }

    deepUpdate(entity, data.path, data.value);

    this.emit('change');
  }
});

module.exports = EntityStore;
