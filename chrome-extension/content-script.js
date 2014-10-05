console.log('hello i am content script');

window.addEventListener('message', function(event) {
	// Only accept messages from same frame
	if (event.source !== window) {
		return;
	}

	var message = event.data;

	// Only accept messages of correct format (our messages)
	if (typeof message !== 'object' || message === null || message.target !== 'page') {
		return;
	}

	chrome.runtime.sendMessage(message);
});