import ReactGA from 'react-ga';

import { ACTION_TO_GA_EVENT } from './constants';
import { parseError, resolveGaPayload } from './util';

export const trackPageView = () => {
  const { location } = document;
  const url = `${location.pathname}${location.search}`;
  const { REACT_APP_ENVIRONMENT, NODE_ENV } = process.env;

  ReactGA.set({
    page: url,
    environment: REACT_APP_ENVIRONMENT || NODE_ENV,
  });

  ReactGA.pageview(url);
};

export const trackEvent = (action) => {
  const { type, payload } = action;

  if (!type) {
    return;
  }

  const eventConfig = ACTION_TO_GA_EVENT[type];

  if (!eventConfig) {
    return;
  }

  const { ignorePayload } = eventConfig;
  const gaAction = !ignorePayload
    ? resolveGaPayload(payload, eventConfig)
    : 'This action must not contain information.';

  ReactGA.event({
    category: eventConfig.category,
    action: gaAction,
    label: type,
  });
};

export const trackError = (type, error) => ReactGA.ga('send', 'exception', {
  exDescription: parseError(type, error),
  exFatal: false,
});

export const trackTiming = (category, variable, value, label) => ReactGA.timing({
  category,
  variable,
  value,
  label,
});
