var sendMessage = require('../util/sendMessage');

module.exports = {
  didGetEntities: function(entities) {
    this.dispatch('didGetEntities', entities);
  },

  subscribeToEntity: function(id) {
    sendMessage('subscribe', {id: id});
  }
};
