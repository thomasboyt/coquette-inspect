var sendMessage = require('./util/sendMessage');

// thx https://github.com/emberjs/ember-inspector/blob/master/app/adapters/chrome.js
var injectDebugger = function() {
  /* jshint evil: true */

  var injectedGlobal = 'window.__coquette_inspect_agent_injected__';

  chrome.devtools.inspectedWindow.eval(injectedGlobal, function(result) {
    if (!result) {
      // script hasn't been injected yet

      var xhr = new XMLHttpRequest();
      xhr.open('GET', chrome.extension.getURL('/build/agent.bundle.js'), false);
      xhr.send();
      var script = xhr.responseText;

      chrome.devtools.inspectedWindow.eval(script, function() {
        sendMessage('connect');
      });
    } else {
      // we're already injected, so just connect
      sendMessage('connect');
    }
  });
};

module.exports = injectDebugger;
