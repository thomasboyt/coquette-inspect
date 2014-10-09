/*
 * agent -> **content-script.js** -> background.js -> dev tools
 */
window.addEventListener('message', function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages of correct format (our messages)
  if (typeof message !== 'object' || message === null ||
      message.source !== 'coquette-inspect-agent') {
    return;
  }

  chrome.runtime.sendMessage(message);
});


/*
 * agent <- **content-script.js** <- background.js <- dev tools
 */
chrome.runtime.onMessage.addListener(function(request) {
  request.source = 'coquette-inspect-devtools';
  window.postMessage(request, '*');
});
