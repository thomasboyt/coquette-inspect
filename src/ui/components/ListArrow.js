var React = require('react');
var classnames = require('classnames');

var ListArrow = React.createClass({
  render: function() {
    var isActive = this.props.isActive;
    var arrowClass = classnames({
      'glyphicon': true,
      'list-arrow': true,
      'glyphicon-chevron-right': !isActive,
      'glyphicon-chevron-down': isActive
    });

    return (
      <span className={arrowClass} />
    );
  }
});

module.exports = ListArrow;
