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
  },

  enableSelectMode: function() {
    sendMessage('enableSelectMode');
  },

  didEnableSelectMode: function() {
    this.dispatch('enabledSelectMode');
  },

  disableSelectMode: function() {
    sendMessage('disableSelectMode');
  },

  didDisableSelectMode: function() {
    this.dispatch('disabledSelectMode');
  }
};
