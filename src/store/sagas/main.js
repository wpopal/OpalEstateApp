import {call, put} from 'redux-saga/effects';

import {Creators as mainActions} from '~/store/ducks/main';
import api from '~/services/api';

export function* mainRequest() {
  try {
    const response = yield call(api.get, '/main');
    console.log('main-sagas-9, response:', response);

    yield put(mainActions.getmainSuccess(response.data));
  } catch (err) {
    console.log('main-sagas-12, error:', err);
    yield put(mainActions.getmainFailure());
  }
}
