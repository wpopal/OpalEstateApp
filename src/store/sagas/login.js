import {call, put} from 'redux-saga/effects';

import {Creators as loginActions} from '../../store/ducks/login';
import api from '../../services/api';

export function* loginRequest() {
  try {
    const response = yield call(api.get, '/login');
    console.log('login-sagas-9, response:', response);

    yield put(loginActions.getloginSuccess(response.data));
  } catch (err) {
    console.log('login-sagas-12, error:', err);
    yield put(loginActions.getloginFailure());
  }
}
