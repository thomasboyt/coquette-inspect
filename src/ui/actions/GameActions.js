var sendMessage = require('../util/sendMessage');

module.exports = {
  pauseGame: function() {
    // pause game
    sendMessage('pause');
  },

  didPauseGame: function() {
    this.dispatch('pausedGame');
  },

  unpauseGame: function() {
    // pause game
    sendMessage('unpause');
  },

  didUnpauseGame: function() {
    this.dispatch('unpausedGame');
  },
};
