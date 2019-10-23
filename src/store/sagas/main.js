import {call, put} from 'redux-saga/effects';
import axios from 'axios';

import {Creators as mainActions} from '../../store/ducks/main';

export function* mainRequest(action) {
  const {page, per_page} = action.param;
  try {
    console.log('asdasdasdas', action);
    const response = yield axios({
      method: 'get',
      params: {
        consumer_key: 'ck_bd09789959d94c7021ec1719df2965d4b0053698',
        consumer_secret: 'cs_66aa5aad77dade62fb399435cff32dca3824ed9a',
        per_page: per_page,
        page: page,
      },
      url:
        'http://10.0.2.2/wordpress/latehome_free/wp-json/estate-api/v1/properties',
      headers: {
        'X-Custom-Header': 'foobar',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMC4wLjIuMlwvd29yZHByZXNzXC9sYXRlaG9tZV9mcmVlIiwiaWF0IjoxNTcxNzEzOTk1LCJuYmYiOjE1NzE3MTM5OTUsImV4cCI6MTU3MjMxODc5NSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0._DoxbAsK9cP4OLCTAEbHIbKoM8Oi446lI-esWOdYAn8',
        Accept: 'application/json',
      },
    });
    console.log('main-sagas-9, response:', response);
    yield put(mainActions.getmainSuccess(response.data));
  } catch (err) {
    console.log('main-sagas-12, error:', err);
    yield put(mainActions.getmainFailure());
  }
}

function get() {}
