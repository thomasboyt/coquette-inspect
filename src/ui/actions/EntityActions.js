module.exports = {
  didGetEntities: function(entities) {
    this.dispatch('didGetEntities', entities);
  },

  openEntity: function(opts) {
    var idx = opts.idx;
    // send message to agent...
  }
};
