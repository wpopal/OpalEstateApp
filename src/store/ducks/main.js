import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'main/GET_REQUEST',
  GET_SUCCESS: 'main/GET_SUCCESS',
  GET_FAILURE: 'main/GET_FAILURE',
};

const initialState = Immutable({
  loading: true,
  error: false,
  data: [],
});

export const Creators = {
  getmainRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getmainSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {data},
  }),

  getmainFailure: () => ({
    type: Types.GET_FAILURE,
  }),
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };

    case Types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default main;
