var sendMessage = require('../util/sendMessage');

module.exports = {
  didGetEntities: function(entities) {
    this.dispatch('didGetEntities', entities);
  },

  subscribeToEntity: function(id) {
    sendMessage('subscribe', {id: id});
  },

  updateProperty: function(data) {
    sendMessage('updateProperty', data);
    this.dispatch('didUpdateProperty', data);  // allow optimistic update
  }
};
