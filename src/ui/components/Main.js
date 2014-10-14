/** @jsx React.DOM */

var React = require('react');
var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var EntityList = require('./EntityList');
var GameState = require('./GameState');

var Main = React.createClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('ConnectionStore')
  ],

  getStateFromFlux: function() {
    var store = this.getFlux().store('ConnectionStore');

    return {
      isConnected: store.isConnected
    };
  },

  renderLoaded: function() {
    return (
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
    );
  },

  renderNoConnection: function() {
    return (
      <div className="col-md-6 col-md-push-3">
        <div className="panel panel-default no-connection">
          <div className="panel panel-heading">
            <h3 className="panel-title">Coquette instance not found :(</h3>
          </div>
          <div className="panel-body">
            <p>
              If there's a coquette application on the page, the most common reason this occurs is
              because its Coquette instance hasn't been exposed on the main window object as
              <code>window.__coquette__</code>. To fix, update your game's constructor, for example:

              <pre>
                {/* this is the worst. */}
                {'var Game = function() {\n'}
                {'  this.c = new Coquette(this, "canvas", 500, 150, "#000");\n'}
                {'  window.__coquette__ = this.c;\n'}
                {'  // ...\n'}
                {'};\n'}
              </pre>
            </p>
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div className="main-container">
        { this.state.isConnected ? this.renderLoaded() : this.renderNoConnection() }
      </div>
    );
  }
});

module.exports = Main;
