import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import './scss/application.scss';
import { register } from './serviceWorker';
import './i18n';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render once
render();

register();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('components/App', () => {
    render();
  });
}
