import React, { Component } from 'react';

import { get } from '../api/entity-api';
import List from '../comps/list';

class EntitiesList extends Component {
  state = {
    entityList: [],
  };

  async componentDidMount() {
    this.setState({
      entityList: await get(),
    });
  }

  render() {
    const { entityList } = this.state;
    return (
      <div className="EntityListPage">
        <List items={entityList} />
      </div>
    );
  }
}

export default EntitiesList;
