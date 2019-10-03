import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'detail/GET_REQUEST',
  GET_SUCCESS: 'detail/GET_SUCCESS',
  GET_FAILURE: 'detail/GET_FAILURE',
};

const initialState = Immutable({
  loading: true,
  error: false,
  data: [],
});

export const Creators = {
  getdetailRequest: param => ({
    type: Types.GET_REQUEST,
    param: param,
  }),

  getdetailSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {data},
  }),

  getdetailFailure: () => ({
    type: Types.GET_FAILURE,
  }),
};

const detail = (state = initialState, action) => {
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

export default detail;
