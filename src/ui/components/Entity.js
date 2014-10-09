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

  renderEntityProperties: function(obj, lastPath) {
    lastPath = lastPath || [];

    var items = Object.keys(obj)
      .filter((prop) => prop !== 'displayName' && prop !== '__inspect_uuid__')
      .map((prop) => {
        var val = obj[prop];

        var path = lastPath.concat(prop);

        if (typeof val === 'object' && val !== null) {
          return (
            <li key={prop}>
              <code>{prop}</code>: {this.renderEntityProperties(val, path)}
            </li>
          );
        }

        return (
          <EntityProperty entity={this.props.entity}
            prop={prop} path={path} value={val} key={prop} />
        );
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
