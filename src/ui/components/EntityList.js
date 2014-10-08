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

  render: function() {
    var items = this.state.entities.map((entity) => {
      var isActive = this.state.activeUuid === entity.__inspect_uuid__;

      return (
        <Entity entity={entity} isActive={isActive}
          onClickEntity={this.handleToggleOpenEntity}
          key={entity.__inspect_uuid__} />
      );
    });

    return (
      <ul>
        {items}
      </ul>
    );
  }
});

module.exports = EntityList;
