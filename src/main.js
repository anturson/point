import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

((window) => {
  const render = () => {
    const route = window.location.hash.substring(1);
    ReactDOM.render(
      React.createElement(App, { route }),
      window.document.getElementById('app'),
    );
  };

  window.addEventListener('hashchange', render);
  render();
})(window);// eslint-disable-line no-undef
