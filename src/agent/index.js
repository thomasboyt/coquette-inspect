console.log('connected');

var sendMessage = function(name, data) {
  window.postMessage({
    source: 'coq-debug',
    name: name,
    data: data || {}
  }, '*');
};

var reportEntities = function(c) {
  var entities = c.entities.all().map(function(entity) {
    return entity.displayName || entity.constructor.name || '<unknown entity>';
  });

  sendMessage('entities', {entities: entities});
};

var initializeDebugLoop = function(c) {
  var debugLoop = function() {
    reportEntities(c);

    // Ensure that this isn't re-enqueued on the same frame, or the runner gets stuck in an endless
    // loop.
    // TODO: setTimeout() seems like a non-optimal way to do this, could end up missing frames
    // or hurting perf? :C
    setTimeout(function() {
      c.runner.add(undefined, debugLoop);
    });
  };

  c.runner.add(undefined, debugLoop);
};

sendMessage('connected');

if (window.__coquette__) {
  console.log('located coquette');

  sendMessage('locatedCoquette');

  initializeDebugLoop(window.__coquette__);

} else {
  console.log('did not locate coquette');

  sendMessage('noCoquetteFound');
}
