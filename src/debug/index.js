setTimeout(function() {
  console.log('sending message...');
  chrome.runtime.sendMessage({hello: 'world'}, function() {
    console.log('sent a message!!');
  });
}, 1000);
