var Fluxxor = require('fluxxor');

var EntityStore = Fluxxor.createStore({
  actions: {
    'didGetEntities': 'onDidGetEntities'
  },

  initialize: function() {
    this.entities = [];
  },

  onDidGetEntities: function(entities) {
    this.entities = entities;
    this.emit('change');
  }
});

module.exports = EntityStore;
