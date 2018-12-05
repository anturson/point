import React from 'react';
import PropTypes from 'prop-types';

import HomePage from './home/home-page';
import AboutPage from './about/about-page';
import EntitiesPage from './entities/entities-page';

const App = ({ route }) => {
  let Page;
  switch (route) {
    case 'about':
      Page = AboutPage;
      break;
    case 'entities':
      Page = EntitiesPage;
      break;
    default:
      Page = HomePage;
  }
  return (
    <div>
      <Page />
    </div>
  );
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
