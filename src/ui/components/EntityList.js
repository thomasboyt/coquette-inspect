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

  handleOpenEntity: function(idx) {
    this.getFlux().actions.entities.openEntity({
      idx: idx
    });
  },

  render: function() {
    var items = this.state.entities.map((name, idx) => (
      <li key={idx}>
        <a onClick={() => this.handleOpenEntity(idx)}>{name}</a>
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
