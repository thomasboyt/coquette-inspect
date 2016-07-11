var React = require('react');
var FluxMixin = require('fluxxor').FluxMixin(React);
var EntityPropertiesList = require('./EntityPropertiesList');
var ListArrow = require('./ListArrow');

var Entity = React.createClass({
  mixins: [
    FluxMixin
  ],

  propTypes: {
    entity: React.PropTypes.object.isRequired,
    isActive: React.PropTypes.bool,
    onClickEntity: React.PropTypes.func.isRequired
  },

  render: function() {
    var isActive = this.props.isActive;
    var entity = this.props.entity;

    return (
      <li className="entity-item">
        <span onClick={() => this.props.onClickEntity(entity.entityId)}>
          <ListArrow isActive={isActive} />
          <span className="entity-item-label">
            {entity.displayName || 'unknown entity'}
          </span>
        </span>

        {isActive && <EntityPropertiesList entity={this.props.subscribedDetail} />}
      </li>
    );
  }
});

module.exports = Entity;
