import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './index.css';
import * as serviceWorker from './serviceWorker';

import { Home } from '../src/pages/Home';
import { Example } from '../src/pages/Example';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/example" component={Example} />
    </Switch>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
