var Fluxxor = require('fluxxor');

var EntityStore = Fluxxor.createStore({
  actions: {
    'loadEntities': 'onLoadEntities'
  },

  initialize: function() {
    this.entities = [];
  },

  onLoadEntities: function(entities) {
    this.entities = entities;
    this.emit('change');
  }
});

module.exports = EntityStore;
