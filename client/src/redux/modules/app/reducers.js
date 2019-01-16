import types from './types';

export const initialState = {
  currentLocation: '',
  features: [],
  isLoading: false,
  isMenuOpen: false,
};

const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case types.LOCATION_CHANGE:
      return {
        ...state,
        confirmation: {
          show: false,
        },
        currentLocation: action.payload.location,
      };
    case types.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
};

export default reducerApp;
