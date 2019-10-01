import {all, takeLatest} from 'redux-saga/effects';

import {Types as HomeTypes} from '~/store/ducks/main';
import {Types as UserTypes} from '~/store/ducks/users';
import {Types as MapTypes} from '~/store/ducks/mapMain';
import {Types as AgencyTypes} from '~/store/ducks/agency';
import {Types as AgentTypes} from '~/store/ducks/agency';

import {mainRequest} from './main';
import {mapMainRequest} from './mapMain';
import {userRequest} from './user';
import {agencyRequest} from './agency';
import {agentRequest} from './agency';

export default function* rootSaga() {
  return yield all([
    takeLatest(HomeTypes.GET_REQUEST, mainRequest),
    takeLatest(UserTypes.GET_REQUEST, userRequest),
    takeLatest(MapTypes.GET_REQUEST, mapMainRequest),
    takeLatest(AgencyTypes.GET_REQUEST, agencyRequest),
    takeLatest(AgentTypes.GET_REQUEST, agentRequest),
  ]);
}
