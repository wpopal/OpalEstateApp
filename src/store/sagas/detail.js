import {call, put} from 'redux-saga/effects';

import {Creators as detailActions} from '~/store/ducks/detail';
import api from '~/services/api';

export function* detailRequest() {
  try {
    const response = yield call(api.get, '/detail');
    console.log('detail-sagas-9, response:', response);

    yield put(detailActions.getdetailSuccess(response.data));
  } catch (err) {
    console.log('detail-sagas-12, error:', err);
    yield put(detailActions.getdetailFailure());
  }
}
