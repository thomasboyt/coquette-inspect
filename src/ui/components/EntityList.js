/** @jsx React.DOM */

var React = require('react');
var FluxChildMixin = require('fluxxor').FluxChildMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var Entity = require('./Entity');

var EntityList = React.createClass({
  mixins: [
    FluxChildMixin,
    StoreWatchMixin('EntityStore')
  ],

  getStateFromFlux: function() {
    var store = this.getFlux().store('EntityStore');
    return {
      entities: store.entities,
      subscribedId: store.subscribedId,
      subscribedDetail: store.subscribedDetail
    };
  },

  handleToggleOpenEntity: function(id) {
    if (this.props.isActive) {
      this.getFlux().actions.entities.unsubscribeFromEntity(id);
    } else {
      this.getFlux().actions.entities.subscribeToEntity(id);
    }
  },

  render: function() {
    var items = this.state.entities.map((entity) => {
      var isActive = entity.entityId === this.state.subscribedId;

      return (
        <Entity entity={entity} isActive={isActive} onClickEntity={this.handleToggleOpenEntity}
          subscribedDetail={this.state.subscribedDetail} key={entity.entityId} />
      );
    });

    return (
      <ul className="entity-list">
        {items}
      </ul>
    );
  }
});

module.exports = EntityList;
