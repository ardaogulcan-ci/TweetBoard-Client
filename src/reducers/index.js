import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authentication from './authentication';

const rootReducer = combineReducers({
  routing,
  authentication,
});

export default rootReducer;
