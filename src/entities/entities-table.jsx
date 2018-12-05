import React, { Component } from 'react';

import { get } from '../api/entity-api';
import Table from '../comps/table';
import List from '../comps/list';

class EntitiesTable extends Component {
  state = {
    entityList: [],
  };

  columns = [
    {
      key: 'name',
      name: 'Name',
    },
    {
      key: 'key',
      name: 'Key',
    },
    {
      key: 'id',
      name: 'Id',
    },
    {
      key: 'fields',
      name: 'Fields',
      valueToString: (fields) => (
        <List items={fields} />
      ),
    },
  ];

  async componentDidMount() {
    this.setState({
      entityList: await get(),
    });
  }

  render() {
    const { entityList } = this.state;
    return (
      <div className="EntityListPage">
        <Table items={entityList} columns={this.columns} />
      </div>
    );
  }
}

export default EntitiesTable;
