import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const configureStore = preloadedState => {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [ thunk, createLogger(), routerMiddleware(browserHistory) ]

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}

export default configureStore;
