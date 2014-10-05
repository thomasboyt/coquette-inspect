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

  render: function() {
    var items = this.state.entities.map(function(entity, idx) {
      return (
        <li key={idx}>
          {entity}
        </li>
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
