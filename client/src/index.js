import 'react-app-polyfill/ie11';
import 'core-js/es6/weak-set';
import 'core-js/fn/string/includes';
import 'core-js/es6/array';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';
import { render } from 'react-dom';
// import ReactGA from 'react-ga';
import en from 'react-intl/locale-data/en';

import './styles/app.scss';
// import { USER_ROLES } from './redux/modules/user/constants';
import defaultIntl from './tools/i18n/en-nz.json';
import registerServiceWorker from './registerServiceWorker';
import store from './redux';

// import SecureRoute from './views/enhancers/SecureRoute';
// import RedirectRoute from './views/enhancers/RedirectRoute';

import Home from './views/pages/Home';
import Maintenance from './views/pages/Maintenance';
import NotFound from './views/pages/NotFound';

// initialise react-intl with en-nz as default locale
addLocaleData(...en);

// initialise analytics
// ReactGA.initialize('****', {
//   debug: false,
//   titleCase: false,
// });

const RouteContainer = posed.div({
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      default: { ease: [0.77, 0.0, 0.175, 1.0], duration: 400 },
      opacity: { ease: 'linear', duration: 350, delay: 50 },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      default: { ease: [0.77, 0.0, 0.175, 1.0], duration: 350, delay: 50 },
      opacity: { ease: 'linear', duration: 400 },
    },
  },
});

render(
  <Provider store={store}>
    <IntlProvider locale="en-NZ" messages={defaultIntl}>
      <Router>
        <Route
          render={({ location }) => (
            <PoseGroup>
              <RouteContainer key={location.pathname}>
                <Switch location={location}>
                  <Route exact path="/" component={Home} />

                  <Route component={NotFound} />
                  <Route component={Maintenance} />
                </Switch>
              </RouteContainer>
            </PoseGroup>
          )}
        />
      </Router>
    </IntlProvider>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

registerServiceWorker();
