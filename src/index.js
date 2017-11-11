/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';

const MainComponent = require('./components/MainComponent.react');

function renderApp(landing) {
  render(
    <MainComponent path={landing} />,
    document.getElementById('application'),
  );
}

renderApp('/');

window.addEventListener('popstate', (e) => {
  renderApp(window.location.pathname);
});

module.hot.accept();
