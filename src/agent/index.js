window.__coquette_inspect_agent_injected__ = true;

var Agent = require('./Agent');
var patchEntities = require('./patchEntities');
var sendMessage = require('./util/sendMessage');

if (window.__coquette__) {
  sendMessage('locatedCoquette');
  patchEntities(window.__coquette__);
  new Agent(window.__coquette__);

} else {
  sendMessage('noCoquetteFound');
}
