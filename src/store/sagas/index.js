import {all, takeLatest} from 'redux-saga/effects';

import {Types as HomeTypes} from '~/store/ducks/main';
import {Types as UserTypes} from '~/store/ducks/users';
import {Types as MapTypes} from '~/store/ducks/mapMain';
import {Types as LoginTypes} from '~/store/ducks/login';

import {mainRequest} from './main';
import {mapMainRequest} from './mapMain';
import {userRequest} from './user';
import {loginRequest} from './login';

export default function* rootSaga() {
  return yield all([
    takeLatest(HomeTypes.GET_REQUEST, mainRequest),
    takeLatest(UserTypes.GET_REQUEST, userRequest),
    takeLatest(MapTypes.GET_REQUEST, mapMainRequest),
    takeLatest(LoginTypes.GET_REQUEST, loginRequest),
  ]);
}
