import {call, put} from 'redux-saga/effects';

import {Creators as agencyActions} from '../../store/ducks/agency';
import api from '../../services/api';

export function* agencyRequest() {
  try {
    const response = yield call(api.get, '/v1/agencies/?per_page=2&page=1');
    console.log('agency-sagas-9, response:', response);
    yield put(agencyActions.getagencySuccess(response.data));
  } catch (err) {
    console.log('agency-sagas-12, error:', err);
    yield put(agencyActions.getagencyFailure());
  }
}

export function* agentRequest(item) {
  console.log('item', item);
  try {
    const response = yield call(api.get, '/v1/agents/?per_page=2&page=1');
    console.log('agency-sagas-9, response:', response);
    yield put(agencyActions.getagentSuccess(response.data));
  } catch (err) {
    console.log('agency-sagas-12, error:', err);
    yield put(agencyActions.getagentFailure());
  }
}
