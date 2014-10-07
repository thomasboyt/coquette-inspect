/** @jsx React.DOM */

var React = require('react');
var FluxChildMixin = require('fluxxor').FluxChildMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var GameState = React.createClass({
  mixins: [
    FluxChildMixin,
    StoreWatchMixin('GameStore')
  ],

  getStateFromFlux: function() {
    var store = this.getFlux().store('GameStore');
    return {
      isPaused: store.isPaused
    };
  },

  handleTogglePause: function(e) {
    e.stopPropagation();

    if (this.state.isPaused) {
      this.getFlux().actions.game.unpauseGame();
    } else {
      this.getFlux().actions.game.pauseGame();
    }
  },

  render: function() {

    return (
      <div>
        {this.state.isPaused ? 'Paused' : 'Running'}

        <a href="#" onClick={this.handleTogglePause}>Toggle</a>
      </div>
    );
  }
});

module.exports = GameState;
