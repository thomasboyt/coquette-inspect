/** @jsx React.DOM */

var React = require('react');
var FluxChildMixin = require('fluxxor').FluxChildMixin(React);
var EntityProperty = require('./EntityProperty');

var Entity = React.createClass({
  mixins: [
    FluxChildMixin
  ],

  propTypes: {
    entity: React.PropTypes.object.isRequired,
    isActive: React.PropTypes.bool,
    onClickEntity: React.PropTypes.func
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

        return <EntityProperty entity={entity} path={prop} value={val} key={prop} />;
      });

    return (
      <ul>
        {items}
      </ul>
    );
  },

  render: function() {
    var isActive = this.props.isActive;
    var entity = this.props.entity;

    return (
      <li>
        <a onClick={() => this.props.onClickEntity(entity.__inspect_uuid__)}>
          {entity.displayName || 'unknown entity'}
        </a>
        {isActive && this.renderEntityProperties(entity)}
      </li>
    );
  }
});

module.exports = Entity;
