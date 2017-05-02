import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { fromJS } from 'immutable';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import configureStore from './store/configureStore';

import api from './configs/api';

import 'normalize.css';
import './style.css';

injectTapEventPlugin();

const token = localStorage.getItem('token');
const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

const store = configureStore({
  authentication: fromJS({
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
