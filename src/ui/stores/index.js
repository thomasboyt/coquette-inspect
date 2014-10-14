var EntityStore = require('./EntityStore');
var GameStore = require('./GameStore');
var ConnectionStore = require('./ConnectionStore');

module.exports = {
  EntityStore: new EntityStore(),
  GameStore: new GameStore(),
  ConnectionStore: new ConnectionStore()
};

