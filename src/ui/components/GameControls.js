var React = require('react');
var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var GameState = React.createClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('GameStore')
  ],

  getStateFromFlux: function() {
    var store = this.getFlux().store('GameStore');
    return {
      isPaused: store.isPaused,
      isSelecting: store.isSelecting,
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

  handleToggleSelectEntity: function(e) {
    e.stopPropagation();

    if (!this.state.isSelecting) {
      this.getFlux().actions.game.enableSelectMode();
    } else {
      this.getFlux().actions.game.disableSelectMode();
    }
  },

  handleStep: function(e) {
    e.stopPropagation();
    this.getFlux().actions.game.step();
  },

  renderPaused: function() {
    return (
      <span>
        <button onClick={this.handleTogglePause} className="activated" title="Play">
          <span className="glyphicon glyphicon-play" />
        </button>
        <button onClick={this.handleStep} title="Step forward">
          <span className="glyphicon glyphicon-step-forward" />
        </button>
      </span>
    );
  },

  renderPlaying: function() {
    var fpsClass = this.state.fps < 59 ? 'fps fps-warning' : 'fps';

    return (
      <span>
        <span className={fpsClass}>{this.state.fps} FPS</span>&nbsp;
        <button onClick={this.handleTogglePause} title="Pause">
          <span className="glyphicon glyphicon-pause" />
        </button>
        <button disabled title="Step forward">
          <span className="glyphicon glyphicon-step-forward" />
        </button>
      </span>
    );
  },

  render: function() {
    var selectClass = this.state.isSelecting ? 'activated' : '';

    return (
      <div className="controls">
        {this.state.isPaused ? this.renderPaused() : this.renderPlaying()}

        <button onClick={this.handleToggleSelectEntity} className={selectClass} title="Click an entity to inspect it.">
          <span className="glyphicon glyphicon-zoom-in" />
        </button>
      </div>
    );
  }
});

module.exports = GameState;
