var sendMessage = require('../util/sendMessage');

module.exports = {
  pauseGame: function() {
    sendMessage('pause');
  },

  didPauseGame: function() {
    this.dispatch('pausedGame');
  },

  unpauseGame: function() {
    sendMessage('unpause');
  },

  didUnpauseGame: function() {
    this.dispatch('unpausedGame');
  },

  step: function() {
    sendMessage('step');
  },

  didTick: function() {
    this.dispatch('ticked');
  }

};
