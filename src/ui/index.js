/** @jsx React.DOM */

require('../../style/main.less');

var React = require('react');
var Main = require('./components/Main');

var injectDebugger = require('./injectDebugger');
var AgentHandler = require('./AgentHandler');
var sendMessage = require('./util/sendMessage');

var Flux = require('fluxxor').Flux;
var actions = require('./actions');
var stores = require('./stores');

var flux = new Flux(stores, actions);

var agentHandler = new AgentHandler(flux);

injectDebugger(function() {
  sendMessage('connect');
});

window.addEventListener('load', function() {
  React.renderComponent(<Main flux={flux}/>, document.getElementById('container'));
});
