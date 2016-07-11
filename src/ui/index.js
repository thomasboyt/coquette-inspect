require('../../style/main.less');

var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('./components/Main');

var injectDebugger = require('./injectDebugger');
var AgentHandler = require('./AgentHandler');

var Flux = require('fluxxor').Flux;
var actions = require('./actions');
var stores = require('./stores');

var flux = new Flux(stores, actions);

var agentHandler = new AgentHandler(flux);

injectDebugger();

window.addEventListener('load', function() {
  ReactDOM.render(<Main flux={flux}/>, document.getElementById('container'));
});
