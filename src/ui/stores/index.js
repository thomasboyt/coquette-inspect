var EntityStore = require('./EntityStore');
var GameStore = require('./GameStore');

module.exports = {
  EntityStore: new EntityStore(),
  GameStore: new GameStore()
};

