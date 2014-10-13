window.__coquette_inspect_agent_injected__ = true;

var Agent = require('./Agent');
var patchEntities = require('./patchEntities');
var sendMessage = require('./util/sendMessage');

sendMessage('connected');

if (window.__coquette__) {
  console.log('located coquette');

  sendMessage('locatedCoquette');

  patchEntities(window.__coquette__);
  var agent = new Agent(window.__coquette__);

} else {
  console.log('did not locate coquette');

  sendMessage('noCoquetteFound');
}
