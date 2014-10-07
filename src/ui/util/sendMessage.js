var port = require('../port');

var sendMessage = function(name, data) {
  port.postMessage({
    name: name,
    tabId: chrome.devtools.inspectedWindow.tabId,
    data: data || {}
  });
};

module.exports = sendMessage;
