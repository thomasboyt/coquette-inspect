// thx https://github.com/emberjs/ember-inspector/blob/master/app/adapters/chrome.js
var injectDebugger = function() {
  /* jshint evil: true */

  var xhr = new XMLHttpRequest();
  // yes, this is a synchronous HTTP request. welcome to the magic world of extension development,
  // where everything is just SLIGHTLY off from regular ol' javascripting
  xhr.open('GET', chrome.extension.getURL('/build/agent.bundle.js'), false);
  xhr.send();

  var script = xhr.responseText;
  chrome.devtools.inspectedWindow.eval(script);
};

module.exports = injectDebugger;
