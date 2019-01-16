import { createSelector } from 'reselect';

const getComponentProps = (state, props) => props;
const getIdFromPath = createSelector([getComponentProps], (props) => {
  if (!props || !props.match) {
    return null;
  }

  return props.match.params.id;
});

const getCurrentLocation = state => state.app.currentLocation;
const isLoading = state => state.app.isLoading;
const isMenuOpen = state => state.app.isMenuOpen;

const isViewportAboveMobile = state => state.browser.greaterThan.mobile;
const isViewportAboveTablet = state => state.browser.greaterThan.tablet;
const isViewportAboveDesktop = state => state.browser.greaterThan.desktop;
const isViewportAboveWidescreen = state => state.browser.greaterThan.widescreen;
const isViewportBelowTablet = state => state.browser.lessThan.tablet;

export default {
  getComponentProps,
  getIdFromPath,

  getCurrentLocation,
  isLoading,
  isMenuOpen,

  isViewportAboveMobile,
  isViewportAboveTablet,
  isViewportAboveDesktop,
  isViewportAboveWidescreen,
  isViewportBelowTablet,
};
