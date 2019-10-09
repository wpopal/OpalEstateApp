import {call, put} from 'redux-saga/effects';

import {Creators as detailActions} from '../../store/ducks/detail';
import api from '../../services/api';
import axios from 'axios';

export function* detailRequest(action) {
  console.log('api', api);
  try {
    const response = yield call(api.get, '/v1/property/' + action.param);
    console.log('detail-sagas-9, response:', response);
    yield put(detailActions.getdetailSuccess(response.data));
  } catch (err) {
    console.log('detail-sagas-12, error:', err);
    yield put(detailActions.getdetailFailure());
  }
}
