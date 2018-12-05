import React, { Component } from 'react';
import PropTypes from 'prop-types';

const itemPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

const columnPropType = PropTypes.shape({
  key: PropTypes.string,
  name: PropTypes.string,
});

const Table = (props) => {
  const {
    items,
    columns,
    onItemClick,
  } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items && items.map(item => (
          <Row
            key={item.id}
            item={item}
            columns={columns}
            onClick={onItemClick}
          />
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  items: PropTypes.arrayOf(itemPropType),
  columns: PropTypes.arrayOf(columnPropType),
  onItemClick: PropTypes.func,
};

Table.defaultProps = {
  items: [],
  columns: [],
  onItemClick: () => { },
};

class Row extends Component {
  static propTypes = {
    item: itemPropType.isRequired,
    columns: PropTypes.arrayOf(columnPropType),
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columns: [],
  }

  handleClick = () => {
    const { item, onClick } = this.props;
    onClick(item);
  };

  render() {
    const { item, columns } = this.props;
    return (
      <tr onClick={this.handleClick}>
        {columns.map(({ key, valueToString = String }) => (
          <td key={key}>
            {valueToString(item[key])}
          </td>
        ))}
      </tr>
    );
  }
}

export default Table;
