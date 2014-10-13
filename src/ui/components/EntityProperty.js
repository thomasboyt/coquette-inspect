/** @jsx React.DOM */

var React = require('react');
var FluxChildMixin = require('fluxxor').FluxChildMixin(React);
var EntityPropertyInput = require('./EntityPropertyInput');

var isUneditable = function(value) {
  return (typeof value === 'string' && (
          value === '[[Coquette namespace]]' ||
          value === '[[Circular reference]]' ||
          value.match(/^\[\[Entity .*\]\]$/) ||
          value.match(/^\[\[object \s[^\s]*\]\]$/)));
};

var EntityProperty = React.createClass({
  mixins: [
    FluxChildMixin
  ],

  getInitialState: function() {
    return {
      isOpen: false
    };
  },

  handleOpen: function() {
    if (isUneditable(this.props.value)) {
      return;
    }

    this.setState({
      isOpen: true
    });
  },

  handleClose: function(e) {
    this.setState({
      isOpen: false
    });

    var value = e.target.value;

    if (typeof this.props.value === 'number') {
      value = parseInt(value, 10);
    }

    this.getFlux().actions.entities.updateProperty({
      entityId: this.props.entity.__inspect_uuid__,
      path: this.props.path,
      value: value
    });
  },

  render: function() {
    var prop = this.props.prop;
    var val = this.props.value;

    var valueDisplay;

    if (this.state.isOpen) {
      valueDisplay = (
        <EntityPropertyInput defaultValue={val} onBlur={this.handleClose} />
      );
    } else {
      valueDisplay = (
        <span onDoubleClick={this.handleOpen}>
          {val === null ? 'null' : val.toString()}
        </span>
      );
    }

    return (
      <li key={prop} className="entity-property-item">
        <code>{prop}</code>: {valueDisplay}
      </li>
    );
  }

});

module.exports = EntityProperty;
