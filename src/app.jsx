import React from 'react';
import PropTypes from 'prop-types';

import HomePage from './home/home-page';
import AboutPage from './about/about-page';

const App = ({ route }) => (
  <div>
    {route === 'about' ? <AboutPage /> : <HomePage />}
  </div>
);

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
