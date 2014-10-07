console.log('connected');

var sendMessage = function(name, data) {
  window.postMessage({
    source: 'coquette-inspect-agent',
    name: name,
    data: data || {}
  }, '*');
};


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
  var entities = this.c.entities.all().map(function(entity) {
    return entity.displayName || entity.constructor.name || '<unknown entity>';
  });

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


sendMessage('connected');

if (window.__coquette__) {
  console.log('located coquette');

  sendMessage('locatedCoquette');

  var agent = new Agent(window.__coquette__);

} else {
  console.log('did not locate coquette');

  sendMessage('noCoquetteFound');
}
