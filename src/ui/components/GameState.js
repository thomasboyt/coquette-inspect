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
        <a onClick={this.handleTogglePause} href="#">
          Play
        </a> | <a onClick={this.handleStep} href="#">
          Step
        </a>
      </span>
    );
  },

  renderPlaying: function() {
    return (
      <span>
        <a onClick={this.handleTogglePause} href="#">
          Pause
        </a>
      </span>
    );
  },

  render: function() {
    var statusLabel = this.state.isPaused ? 'Paused' : 'Running';

    var fpsClass = this.state.fps < 59 ? 'fps-warning' : null;

    return (
      <div>
        {statusLabel} {this.state.isPaused ? this.renderPaused() : this.renderPlaying()}<br/>
        <span className={fpsClass}>FPS: {this.state.fps}</span>
      </div>
    );
  }
});

module.exports = GameState;
