var React = require('react');

var EntityPropertyInput = React.createClass({
  componentDidMount: function() {
    var input = this.refs.input;
    input.select();
  },

  handleKeyPress: function(e) {
    if (e.charCode === 13) {  // enter
      this.refs.input.blur();
    }
  },

  render: function() {
    var val = this.props.val;

    if (typeof val === 'string') {
      val = '"' + val + '"';
    }

    return (
      <input onBlur={this.props.onBlur} defaultValue={val} ref="input" onKeyPress={this.handleKeyPress} />
    );
  }
});

module.exports = EntityPropertyInput;
