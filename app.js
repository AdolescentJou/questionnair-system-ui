import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import App from './src/app';
import './public/scss/index.scss';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('form-builder'),
);