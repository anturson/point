import React, { Component } from 'react';
import PropTypes from 'prop-types';

const itemPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

const List = ({ items, onItemClick, ...restProps }) => (
  <ul className="nav flex-column">
    {items && items.map(item => (
      <ListItem
        {...restProps}
        key={item.id}
        item={item}
        onClick={onItemClick}
      />
    ))}
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(itemPropType),
  onItemClick: PropTypes.func,
};

List.defaultProps = {
  items: [],
  onItemClick: null,
};

class ListItem extends Component {
  static propTypes = {
    item: itemPropType.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: null,
  }

  renderItem = () => {
    const { item, onClick } = this.props;
    if (onClick) {
      return (
        <button
          type="button"
          className="btn btn-link"
          onClick={this.handleClick}
        >
          {String(item.name)}
        </button>
      );
    }
    return (
      <span>{item.name}</span>
    );
  };

  handleClick = () => {
    const { item, onClick } = this.props;
    onClick(item);
  };

  render() {
    return (
      <li>
        {this.renderItem()}
      </li>
    );
  }
}

export default List;
