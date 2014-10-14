/** @jsx React.DOM */

var React = require('react/addons');

var ListArrow = React.createClass({
  render: function() {
    var isActive = this.props.isActive;
    var arrowClass = React.addons.classSet({
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
