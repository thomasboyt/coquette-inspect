console.log('connected');

window.postMessage({target: 'page', name: 'connected', data: {}}, '*');

if (window.__coquette__) {
  console.log('located coquette');

  window.postMessage({target: 'page', name: 'locatedCoquette', data: {}}, '*');

  var c = window.__coquette__;

  var debugLoop = function() {
    // Report entities
    var entities = c.entities.all().map(function(entity) {
      return entity.displayName || entity.constructor.name || '<unknown entity>';
    });

    window.postMessage({target: 'page', name: 'entities', data: {entities: entities}}, '*');

    // TODO: setTimeout() seems like a non-optimal way to do this :(
    setTimeout(function() {
      c.runner.add(undefined, debugLoop);
    });
  };

  c.runner.add(undefined, debugLoop);
}
