var EntityActions = require('./EntityActions');
var GameActions = require('./GameActions');

module.exports = {
  entities: EntityActions,
  game: GameActions,

  didConnect: function() {
    this.dispatch('connected');
  }
};
