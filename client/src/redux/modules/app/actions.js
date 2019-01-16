// Exports all actions for the module
import { actionCreator } from 'redux-action-creator';
import types from './types';

const toggleMenu = actionCreator(types.TOGGLE_MENU);
const locationChange = actionCreator(types.LOCATION_CHANGE, 'location');

export default {
  toggleMenu,
  locationChange,
};
