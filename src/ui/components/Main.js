/** @jsx React.DOM */

var React = require('react');
var FluxMixin = require('fluxxor').FluxMixin(React);
var EntityList = require('./EntityList');
var GameState = require('./GameState');

var Main = React.createClass({
  mixins: [FluxMixin],

  render: function() {
    return (
      <div className="main-container">
        <div className="panel panel-default">

          <div className="panel-heading">
            <GameState />
            <h3 className="panel-title">
              Entities
            </h3>
          </div>
          <div className="panel-body">
            <EntityList />
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Main;
