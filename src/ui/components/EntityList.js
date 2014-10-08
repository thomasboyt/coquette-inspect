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

  renderEntityProperties: function(entity) {
    var items = Object.keys(entity).map((prop) => {
      var val = entity[prop];

      if (typeof val === 'object' && val !== null) {
        return (
          <li key={prop}>
            <code>{prop}</code>: <code>{this.renderEntityProperties(val)}</code>
          </li>
        );
      }

      return (
        <li key={prop}>
          <code>{prop}</code>: <code>{val}</code>
        </li>
      );
    });

    return (
      <ul>
        {items}
      </ul>
    );
  },

  render: function() {

    var items = this.state.entities.map((entity) => (
      <li key={entity.__inspect_uuid__}>
        <a onClick={() => this.handleOpenEntity(entity.__inspect_uuid__)}>
          {entity.displayName || 'unknown entity'}
        </a>
        {this.renderEntityProperties(entity)}
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
