/** @jsx React.DOM */

var React = require('react');
var FluxChildMixin = require('fluxxor').FluxChildMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var EntityList = React.createClass({
  mixins: [
    FluxChildMixin,
    StoreWatchMixin('EntityStore')
  ],

  getStateFromFlux: function() {
    var store = this.getFlux().store('EntityStore');
    return {
      entities: store.entities
    };
  },

  handleOpenEntity: function(id) {
    this.getFlux().actions.entities.subscribeToEntity(id);
  },

  render: function() {
    var items = this.state.entities.map((entity) => (
      <li key={entity.__inspect_uuid__}>
        <a onClick={() => this.handleOpenEntity(entity.__inspect_uuid__)}>
          {entity.name}
        </a>
      </li>
    ));

    return (
      <ul>
        {items}
      </ul>
    );
  }
});

module.exports = EntityList;
