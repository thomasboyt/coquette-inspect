var sendMessage = require('../util/sendMessage');

module.exports = {
  didGetEntities: function(entities, subscribedDetail) {
    this.dispatch('didGetEntities', entities, subscribedDetail);
  },

  subscribeToEntity: function(id) {
    sendMessage('subscribeToEntity', {entityId: id});
  },

  unsubscribeFromEntity: function(id) {
    sendMessage('unsubscribeFromEntity', {entityId: id});
  },

  updateProperty: function(data) {
    sendMessage('updateProperty', data);
    this.dispatch('didUpdateProperty', data);  // allow optimistic update
  }
};
