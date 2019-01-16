// import { takeEvery, call, put } from 'redux-saga/effects';
// import humps from 'humps';
// import { replace } from 'connected-react-router';
// import api from './api';
//
// import types from './types';
//
// function* example(action) {
//   const { ***, *** } = action.payload;
//
//   try {
//     const response = yield call(api.***, {});
//     const payload = humps.camelizeKeys(response);
//
//     yield put({ type: types.EXAMPLE_SUCCESS, payload });
//   } catch (error) {
//     yield put({ type: types.EXAMPLE_FAIL });
//   }
// }
//
// export function* appSaga() {
//   // yield takeEvery(types.EXAMPLE, example);
// }
//
// export default appSaga;
