import {call, put} from 'redux-saga/effects';

import {Creators as userActions} from '../../store/ducks/users';
import api from '../../services/api';

export function* userRequest() {
  try {
    const response = yield call(api.get, '/user');
    console.log('user-sagas-9, response:', response);

    yield put(userActions.getuserSuccess(response.data));
  } catch (err) {
    console.log('user-sagas-12, error:', err);
    yield put(userActions.getuserFailure());
  }
}
