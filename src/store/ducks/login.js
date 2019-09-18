import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'login/GET_REQUEST',
  GET_SUCCESS: 'login/GET_SUCCESS',
  GET_FAILURE: 'login/GET_FAILURE',
};

const initialState = Immutable({
  loading: false,
  error: false,
  data: [],
});

export const Creators = {
  getloginRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getloginSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getloginFailure: () => ({
    type: Types.GET_FAILURE,
  }),
};

const login = (state = initialState, action) => {
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

export default login;
