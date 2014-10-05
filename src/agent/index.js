window.postMessage({target: 'page', name: 'connected', data: {}}, '*');

if (window.__coquette__) {
  var c = window.__coquette__;

  var entities = c.entities.all().map(function(entity) {
    return entity.displayName || entity.constructor.name || '<unknown entity>';
  });

  window.postMessage({target: 'page', name: 'locatedCoquette', data: {
    entities: entities
  }}, '*');
}
