/** @jsx React.DOM */

var React = require('react');
var FluxMixin = require('fluxxor').FluxMixin(React);
var EntityList = require('./EntityList');
var GameState = require('./GameState');

var Main = React.createClass({
  mixins: [FluxMixin],

  render: function() {
    return (
      <div>
        <GameState />
        <EntityList />
      </div>
    );
  }
});

module.exports = Main;
