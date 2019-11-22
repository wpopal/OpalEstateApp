import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'login/GET_REQUEST',
  GET_SUCCESS: 'login/GET_SUCCESS',
  GET_FAILURE: 'login/GET_FAILURE',
  UPDATE_FU: 'user/UPDATE_FU',
  SET_LANG: 'user/SET_LANG',
};

const initialState = Immutable({
  loading: false,
  error: false,
  fu: 'nânnanannanana',
  data: [],
});

export const Creators = {
  getloginRequest: () => ({
    type: Types.GET_REQUEST,
  }),
  setLang: data => ({
    type: Types.SET_LANG,
    payload: {data},
  }),
  updateFu: data => ({
    type: Types.UPDATE_FU,
    payload: {data},
  }),
  getloginSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {data},
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
    case Types.UPDATE_FU: {
      return {
        ...state,
        loading: true,
        fu: action.payload.data,
      };
    }
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
