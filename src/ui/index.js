/** @jsx React.DOM */

var React = require('react');
var Main = require('./components/Main');

var injectDebugger = require('./injectDebugger');

var Flux = require('fluxxor').Flux;
var EntityActions = require('./actions/EntityActions');
var EntityStore = require('./stores/EntityStore');

var stores = {
  EntityStore: new EntityStore()
};

var actions = {
  entities: EntityActions
};

var flux = new Flux(stores, actions);

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(msg) {
  if (msg.name === 'connected') {
    // document.write('connected');
  } else if (msg.name === 'entities') {
    flux.actions.entities.loadEntities(msg.data.entities);
  } else {
    // console.log('unknown event type', msg.name);
  }
});

console.log('injecting debugger');
injectDebugger();

window.addEventListener('load', function() {
  React.renderComponent(<Main flux={flux}/>, document.getElementById('container'));
});
