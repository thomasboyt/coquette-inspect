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
      isPaused: store.isPaused,
      fps: store.fps
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

  handleStep: function(e) {
    e.stopPropagation();
    this.getFlux().actions.game.step();
  },

  renderPaused: function() {
    return (
      <span>
        <button onClick={this.handleTogglePause} className="activated">
          <span className="glyphicon glyphicon-play" />
        </button>
        <button onClick={this.handleStep}>
          <span className="glyphicon glyphicon-step-forward" />
        </button>
      </span>
    );
  },

  renderPlaying: function() {
    return (
      <span>
        <button onClick={this.handleTogglePause}>
          <span className="glyphicon glyphicon-pause" />
        </button>
        <button disabled>
          <span className="glyphicon glyphicon-step-forward" />
        </button>
      </span>
    );
  },

  render: function() {
    var fpsClass = this.state.fps < 59 ? 'fps fps-warning' : 'fps';

    return (
      <div className="controls">
        <span className={fpsClass}>{this.state.fps} FPS</span>&nbsp;
        {this.state.isPaused ? this.renderPaused() : this.renderPlaying()}
      </div>
    );
  }
});

module.exports = GameState;
