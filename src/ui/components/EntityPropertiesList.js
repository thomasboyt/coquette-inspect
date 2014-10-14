/** @jsx React.DOM */

var React = require('react/addons');
var FluxChildMixin = require('fluxxor').FluxChildMixin(React);
var EntityProperty = require('./EntityProperty');
var ListArrow = require('./ListArrow');

// TODO: This is currently inlined in this file because of the circular dependency between
// EntityObjectProperty and EntityPropertiesList :(
var EntityObjectProperty = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false
    };
  },

  handleToggleOpen: function() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  render: function() {
    var isOpen = this.state.isOpen;

    return (
      <li>
        <span onClick={this.handleToggleOpen}>
          <ListArrow isActive={isOpen} />
          <code>{this.props.prop}</code>: Object
        </span>

        {isOpen && <EntityPropertiesList entity={this.props.entity} obj={this.props.obj}
          lastPath={this.props.path} />}
      </li>
    );
  }
});

var EntityPropertiesList = React.createClass({
  mixins: [
    FluxChildMixin
  ],

  propTypes: {
    entity: React.PropTypes.object.isRequired,
    obj: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]),
    lastPath: React.PropTypes.array
  },

  renderItem: function(key, val) {
    var lastPath = this.props.lastPath || [];
    var path = lastPath.concat(key);

    if (typeof val === 'object' && val !== null) {
      return (
        <EntityObjectProperty entity={this.props.entity}
          prop={key} path={path} obj={val} key={key} />
      );
    }

    return (
      <EntityProperty entity={this.props.entity}
        prop={key} path={path} value={val} key={key} />
    );
  },

  render: function() {
    var obj = this.props.obj || this.props.entity;

    var items = Object.keys(obj)
      .filter((prop) => prop !== 'displayName' && prop !== '__inspect_uuid__')
      .map((prop) => this.renderItem(prop, obj[prop]));

    return (
      <ul>
        {items}
      </ul>
    );
  }
});

module.exports = EntityPropertiesList;
