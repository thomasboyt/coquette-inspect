// thx https://github.com/emberjs/ember-inspector/blob/master/app/adapters/chrome.js

var injectDebugger = function() {
  var xhr = new XMLHttpRequest();
  // yes, this is a synchronous HTTP request. welcome to the magic world of extension development,
  // where everything is just SLIGHTLY off from regular ol' javascripting
  xhr.open('GET', chrome.extension.getURL('/debug.bundle.js'), false);
  xhr.send();

  var script = xhr.responseText;
  chrome.devtools.inspectedWindow.eval(script);
};

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(msg) {
  alert(msg);
});

injectDebugger();
