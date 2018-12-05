import React from 'react';

import Header from '../layout/header';
import EntitiesTable from './entities-table';

const EntityListPage = () => (
  <div className="EntityListPage">
    <Header />
    <h1>Entities</h1>
    <EntitiesTable />
  </div>
);

export default EntityListPage;
