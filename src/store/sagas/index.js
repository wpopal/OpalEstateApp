import {all, takeLatest} from 'redux-saga/effects';

import {Types as HomeTypes} from '~/store/ducks/main';
import {Types as DetailTypes} from '~/store/ducks/detail';

import {mainRequest} from './main';
import {detailRequest} from './detail';

export default function* rootSaga() {
  return yield all([
    takeLatest(HomeTypes.GET_REQUEST, mainRequest),
    takeLatest(DetailTypes.GET_REQUEST, detailRequest),
  ]);
}
