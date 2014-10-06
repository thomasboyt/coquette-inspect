module.exports = {
  loadEntities: function(entities) {
    this.dispatch('loadEntities', entities);
  },

  openEntity: function(opts) {
    var idx = opts.idx;
    // send message to agent...
  }
};
