var sendMessage = require('./util/sendMessage');
var serializeEntity = require('./util/serializeEntity');

var Agent = function(c) {
  this.c = c;

  this.initDebugLoop();
  this.initDevtoolsMessageListener();
};

Agent.prototype.initDebugLoop = function() {
  var debugLoop = function() {
    this.reportEntities();

    // Ensure that this isn't re-enqueued on the same frame, or the runner gets stuck in an endless
    // loop.
    // TODO: setTimeout() seems like a non-optimal way to do this, could end up missing frames
    // or hurting perf? :C
    setTimeout(function() {
      this.c.runner.add(undefined, debugLoop);
    }.bind(this));
  }.bind(this);

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
  var entities = this.c.entities.all().map(serializeEntity);

  sendMessage('entities', {entities: entities});
};

Agent.prototype.pauseExecution = function() {
  this.c.ticker.stop();
  sendMessage('paused');
};

Agent.prototype.resumeExecution = function() {
  this.c.ticker.start();
  sendMessage('unpaused');
};

Agent.prototype.handleMessage = function(message) {
  if (message.name === 'pause') {
    this.pauseExecution();
  } else if (message.name === 'unpause') {
    this.resumeExecution();
  }
};

module.exports = Agent;
