import {all, takeLatest} from 'redux-saga/effects';

import {Types as HomeTypes} from '~/store/ducks/main';

import {mainRequest} from './main';

export default function* rootSaga() {
  return yield all([
    takeLatest(HomeTypes.GET_REQUEST, mainRequest),
  ]);
}
