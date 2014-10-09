/** @jsx React.DOM */

var React = require('react');

var EntityPropertyInput = React.createClass({
  componentDidMount: function() {
    var input = this.refs.input.getDOMNode();
    input.select();
  },

  handleKeyPress: function(e) {
    if (e.charCode === 13) {  // enter
      this.refs.input.getDOMNode().blur();
    }
  },

  render: function() {
    var input = <input ref="input" onKeyPress={this.handleKeyPress} />;
    this.transferPropsTo(input);
    return input;
  }
});

module.exports = EntityPropertyInput;
