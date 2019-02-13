import {
  applyMiddleware, combineReducers, createStore, compose,
} from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createResponsiveStateReducer, responsiveStoreEnhancer } from 'redux-responsive';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import * as reducers from './modules';
// import rootSaga from './modules/sagas';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  browser: createResponsiveStateReducer({
    mobile: 767,
    tablet: 768,
    desktop: 1025,
    widescreen: 1275,
  }),
  ...reducers,
  router: connectRouter(history),
});

const sagaMiddleware = createSagaMiddleware({});

const middleware = [routerMiddleware(history), sagaMiddleware];

let composeEnhancers = compose;

if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
  // eslint-disable-next-line no-underscore-dangle
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension;
  }
}

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(responsiveStoreEnhancer, applyMiddleware(...middleware)),
);

export default store;

// sagaMiddleware.run(rootSaga);
