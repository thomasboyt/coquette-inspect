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

  getInitialState: function() {
    return {
      activeUuid: null
    };
  },

  handleToggleOpenEntity: function(id) {
    if (this.state.activeUuid === id) {
      this.setState({
        activeUuid: null
      });

    } else {
      this.setState({
        activeUuid: id
      });
    }
  },

  renderEntityProperties: function(entity) {
    var items = Object.keys(entity)
      .filter((prop) => prop !== 'displayName' && prop !== '__inspect_uuid__')
      .map((prop) => {
        var val = entity[prop];

        if (typeof val === 'object' && val !== null) {
          return (
            <li key={prop}>
              <code>{prop}</code>: <code>{this.renderEntityProperties(val)}</code>
            </li>
          );
        }

        var valString = val === null ? 'null' : val.toString();

        return (
          <li key={prop}>
            <code>{prop}</code>: <code>{valString}</code>
          </li>
        );
      });

    return (
      <ul>
        {items}
      </ul>
    );
  },

  renderEntityItem: function(entity) {
    var isActive = this.state.activeUuid === entity.__inspect_uuid__;

    return (
      <li key={entity.__inspect_uuid__}>
        <a onClick={() => this.handleToggleOpenEntity(entity.__inspect_uuid__)}>
          {entity.displayName || 'unknown entity'}
        </a>
        {isActive && this.renderEntityProperties(entity)}
      </li>
    );
  },

  render: function() {
    var items = this.state.entities.map(this.renderEntityItem);

    return (
      <ul>
        {items}
      </ul>
    );
  }
});

module.exports = EntityList;
