var port = require('./port');
var injectDebugger = require('./injectDebugger');

var AgentHandler = function(flux) {
  this.flux = flux;

  port.onMessage.addListener((msg) => { this.handleMessage(msg); });
  
  this.handlers = {
    connected: () => this.flux.actions.didConnect(),

    reloaded: () => injectDebugger(),

    tick: (data) => {
      this.flux.actions.entities.didGetEntities({
        entities: data.entities,
        subscribedEntity: data.subscribedEntity
      });

      this.flux.actions.game.didTick();
    },

    paused: () => this.flux.actions.game.didPauseGame(),
    unpaused: () => this.flux.actions.game.didUnpauseGame(),

    enabledSelectMode: () => this.flux.actions.game.didEnableSelectMode(),
    disabledSelectMode: () => this.flux.actions.game.didDisableSelectMode()
  };
};

AgentHandler.prototype.handleMessage = function(message) {
  var handler = this.handlers[message.name];
  if (!handler) {
    console.warn('No handler found for event ' + name);
    return;
  }

  handler(message.data);
};

module.exports = AgentHandler;
