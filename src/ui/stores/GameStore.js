var Fluxxor = require('fluxxor');
var _ = require('lodash');

// Calculate average delta time over last maxSamples frames
// via http://stackoverflow.com/a/87732
var mkAvgTick = function(maxSamples) {
  var tickIdx = 0;
  var tickSum = 0;
  var tickList = _.range(0, maxSamples).map(() => 0);

  return function(dt) {
    tickSum -= tickList[tickIdx];
    tickSum += dt;
    tickList[tickIdx] = dt;

    tickIdx += 1;
    if (tickIdx === maxSamples) {
      tickIdx = 0;
    }

    return tickSum / maxSamples;
  };
};

var GameStore = Fluxxor.createStore({
  actions: {
    'pausedGame': 'onPausedGame',
    'unpausedGame': 'onUnpausedGame',
    'ticked': 'onTicked',
    'enabledSelectMode': 'onEnabledSelectMode',
    'disabledSelectMode': 'onDisabledSelectMode'
  },

  initialize: function() {
    this._lastTick = null;
    this._avgTick = mkAvgTick(100);
    this.isPaused = false;
  },

  onPausedGame: function() {
    this.isPaused = true;
    this.emit('change');
  },

  onUnpausedGame: function() {
    this.isPaused = false;
    this.emit('change');
  },

  onTicked: function() {
    var cur = Date.now();

    if (this._lastTick !== null) {
      var dt = cur - this._lastTick;
      this.fps = Math.round(1000 / this._avgTick(dt));
    }

    this._lastTick = cur;

    this.emit('change');
  },

  onEnabledSelectMode: function() {
    this.isSelecting = true;
    this.emit('change');
  },

  onDisabledSelectMode: function() {
    this.isSelecting = false;
    this.emit('change');
  }
});

module.exports = GameStore;
