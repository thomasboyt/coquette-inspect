var Fluxxor = require('fluxxor');

var GameStore = Fluxxor.createStore({
  actions: {
    'pausedGame': 'onPausedGame',
    'unpausedGame': 'onUnpausedGame'
  },

  initialize: function() {
    this.isPaused = false;
  },

  onPausedGame: function() {
    this.isPaused = true;
    this.emit('change');
  },

  onUnpausedGame: function() {
    this.isPaused = false;
    this.emit('change');
  }
});

module.exports = GameStore;
