var React = require('react');
var FluxMixin = require('fluxxor').FluxMixin(React);
var EntityPropertyInput = require('./EntityPropertyInput');

var isUneditable = function(value) {
  return (typeof value === 'string' && (
          value === '[[Coquette namespace]]' ||
          value === '[[Circular reference]]' ||
          value.match(/^\[\[Entity .*\]\]$/) ||
          value.match(/^\[\[object [^\s]*\]\]$/)));
};

var EntityProperty = React.createClass({
  mixins: [
    FluxMixin
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

  getClassFor: function(val) {
    if (isUneditable(val)) {
      return;
    }

    var className;
    if (val === null) {
      className = 'null';
    } else {
      className = typeof val;
    }

    return 'console-formatted-' + className;
  },

  renderValue: function() {
    var val = this.props.value;

    var className = this.getClassFor(val);
    var isString = className === 'console-formatted-string';

    return (
      <span className={className} onDoubleClick={this.handleOpen}>
        {isString && '"'}
        {val === null ? 'null' : val.toString()}
        {isString && '"'}
      </span>
    );
  },

  render: function() {
    var prop = this.props.prop;

    var valueDisplay;
    if (this.state.isOpen) {
      valueDisplay = (
        <EntityPropertyInput val={this.props.value} onBlur={this.handleClose} />
      );
    } else {
      valueDisplay = this.renderValue();
    }

    return (
      <li key={prop} className="entity-property-item">
        <code>{prop}</code>: {valueDisplay}
      </li>
    );
  }

});

module.exports = EntityProperty;
