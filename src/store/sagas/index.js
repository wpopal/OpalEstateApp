import {all, takeLatest} from 'redux-saga/effects';

import {Types as UserTypes} from '../../store/ducks/users';
import {Types as MapTypes} from '../../store/ducks/mapMain';
import {Types as AgencyTypes} from '../../store/ducks/agency';
import {Types as DetailTypes} from '../../store/ducks/detail';
import {Types as LoginTypes} from '../../store/ducks/login';

import {mapMainRequest} from './mapMain';
import {setLangSaga} from './login';
import {agencyRequest} from './agency';
import {detailRequest} from './detail';

export default function* rootSaga() {
  return yield all([
    takeLatest(LoginTypes.SET_LANG, setLangSaga),
    takeLatest(MapTypes.SET_LANG, setLangSaga),
    takeLatest(MapTypes.GET_REQUEST, mapMainRequest),
    takeLatest(AgencyTypes.GET_REQUEST, agencyRequest),
    takeLatest(DetailTypes.GET_REQUEST, detailRequest),
    takeLatest(DetailTypes.GET_REQUEST, detailRequest),
    takeLatest(DetailTypes.GET_REQUEST, detailRequest),
  ]);
}
