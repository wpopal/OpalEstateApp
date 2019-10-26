import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'user/GET_REQUEST',
  GET_SUCCESS: 'user/GET_SUCCESS',
  GET_FAILURE: 'user/GET_FAILURE',
  UPDATE_FU: 'user/UPDATE_FU',
};

const initialState = Immutable({
  loading: false,
  error: false,

  data: [],
});

export const Creators = {
  getuserRequest: () => ({
    type: Types.GET_REQUEST,
  }),
  updateFu: data => ({
    type: Types.UPDATE_FU,
    payload: {data},
  }),
  getuserSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {data},
  }),

  getuserFailure: () => ({
    type: Types.GET_FAILURE,
  }),
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.UPDATE_FU:
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

export default user;
