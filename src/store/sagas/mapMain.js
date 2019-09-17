import {call, put} from 'redux-saga/effects';

import {Creators as mapMainActions} from '~/store/ducks/mapMain';
import api from '~/services/api';

export function* mapMainRequest() {
  try {
    const response = yield call(api.get, '/mapMain');
    console.log('detail-sagas-9, response:', response);

    yield put(mapMainActions.getmapMainSuccess(response.data));
  } catch (err) {
    console.log('detail-sagas-12, error:', err);
    yield put(mapMainActions.getmapMainFailure());
  }
}
