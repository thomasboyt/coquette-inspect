var sendMessage = require('./util/sendMessage');
var serializeEntity = require('./util/serializeEntity');
var deepUpdate = require('../common/deepUpdate');

var GAME_OBJECT_ID = 'game_object';

/**
 * TODO: why is this even a Class? doesn't really do anything particularly ~object-oriented~
 * not sure what to refactor it into, tho
 */
var Agent = function(c) {
  this.c = c;
  this.game = c.entities.game;

  if (!this.game.displayName) {
    this.game.displayName = '<Game object>';
  }
  this.game.__inspect_uuid__ = GAME_OBJECT_ID;

  this.initDebugLoop();
  this.initDevtoolsMessageListener();
};

Agent.prototype.initDebugLoop = function() {
  var debugLoop = () => {
    this.reportEntities();

    // Ensure that this isn't re-enqueued on the same frame, or the runner gets stuck in an endless
    // loop.
    // TODO: setTimeout() seems like a non-optimal way to do this, could end up missing frames
    // or hurting perf? :C
    setTimeout(() => {
      this.c.runner.add(undefined, debugLoop);
    });
  };

  this.c.runner.add(undefined, debugLoop);
};

Agent.prototype.initDevtoolsMessageListener = function() {
  window.addEventListener('message', function(event) {
    // Only accept messages from same frame
    if (event.source !== window) {
      return;
    }

    var message = event.data;

    // Only accept messages of correct format (our messages)
    if (typeof message !== 'object' || message === null ||
        message.source !== 'coquette-inspect-devtools') {
      return;
    }

    this.handleMessage(message);
  }.bind(this));
};

Agent.prototype.reportEntities = function() {
  var entities = this.c.entities.all().concat(this.game);

  var serialized = entities.map((entity) => serializeEntity(entity, entities));

  sendMessage('tick', {entities: serialized});
};

Agent.prototype.handlers = {
  'pause': function() {
    this.c.ticker.stop();
    sendMessage('paused');
  },

  'unpause': function() {
    this.c.ticker.start();
    sendMessage('unpaused');
  },

  'step': function() {
    this.c.ticker.start();  // this schedules a cb for the next requestAnimationFrame()...
    this.c.ticker.stop();  // ...and this cancels it
  },

  'updateProperty': function(data) {
    // find entity by UUID
    var entity;
    if (data.entityId === GAME_OBJECT_ID) {
      entity = this.game;
    } else {
      entity = this.c.entities.all()
        .filter((entity) => entity.__inspect_uuid__ === data.entityId)[0];
    }

    if (!entity) {
      throw new Error('No entity found with id ' + data.entityId);
    }

    deepUpdate(entity, data.path, data.value);
  }
};

Agent.prototype.handleMessage = function(message) {
  var handler = this.handlers[message.name];
  if (!handler) {
    throw new Error('No handler found for event ' + name);
  }

  handler.call(this, message.data);
};

module.exports = Agent;
