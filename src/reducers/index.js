import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authentication from './authentication';
import users from './users';

const rootReducer = combineReducers({
  routing,
  authentication,
  users,
});

export default rootReducer;
