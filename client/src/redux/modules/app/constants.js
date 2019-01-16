import IcoMoonIcons from '../../../tools/utilities/icomoon-content';
import SVGs from '../../../tools/utilities/svg-content';

// Environments
export const MOCK_ENVIRONMENTS = ['development', 'test'];
export const {
  NODE_ENV,
  REACT_APP_ENVIRONMENT,
  REACT_APP_FEATURE_BRANCH,
  REACT_APP_COMMIT_HASH,
} = process.env;
export const ENVIRONMENT = REACT_APP_ENVIRONMENT || NODE_ENV;
export const IS_MOCK_ENVIRONMENT = MOCK_ENVIRONMENTS.indexOf(ENVIRONMENT) !== -1;
export const FEATURE_BRANCH = REACT_APP_FEATURE_BRANCH;
export const COMMIT_HASH = REACT_APP_COMMIT_HASH;

// Misc
export const ICONS = {
  IcoMoonIcons,
  SVGs,
};

export const APP_DELAYS = {
  MENU_CLOSE: 300,
};

export const KEY_CODES = {
  ESCAPE: 27,
  ENTER: 16,
};

export const USER_ROLES = {
  USER: 'user',
};

export default {
  APP_DELAYS,
  KEY_CODES,
};
