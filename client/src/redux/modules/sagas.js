import { /* fork, */ all } from 'redux-saga/effects';

// NOTE: appSaga is intentionally commented out (here and within redux/modules/app).
// Use it as an example for what your own Redux modules might look like.

// import { appSaga } from './app/sagas';

export default function* root() {
  yield all([
    // fork(appSaga),
  ]);
}
