import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Map } from 'immutable';

import routes from './routes';
import configureStore from './store/configureStore';

import api from './configs/api';

import 'normalize.css';
import './style.css';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const store = configureStore({
  authentication: Map({
    loading: false,
    valid: true,
    error: null,
    token: token,
    user: user
  }),
});

if (token) {
  api.token = token;
}

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
