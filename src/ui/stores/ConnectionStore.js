var Fluxxor = require('fluxxor');

var ConnectionStore = Fluxxor.createStore({
  actions: {
    'connected': 'onConnected'
  },

  initialize: function() {
    this.isConnected = false;
  },

  onConnected: function() {
    this.isConnected = true;
    this.emit('change');
  }
});

module.exports = ConnectionStore;
