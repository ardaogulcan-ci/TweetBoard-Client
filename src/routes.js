import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomeContainer from './containers/HomeContainer/HomeContainer';
import BoardsContainer from './containers/BoardsContainer/BoardsContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="/:userSlug/boards" component={BoardsContainer}></Route>
    <Route path="/:userSlug/boards/:boardSlug" component={BoardsContainer}></Route>
  </Route>
);
