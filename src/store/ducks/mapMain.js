import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'mapMain/GET_REQUEST',
  GET_SUCCESS: 'mapMain/GET_SUCCESS',
  GET_FAILURE: 'mapMain/GET_FAILURE',
};

const initialState = Immutable({
  loading: false,
  error: false,
  data: [],
});

export const Creators = {
  getmapMainRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getmapMainSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getmapMainFailure: () => ({
    type: Types.GET_FAILURE,
  }),
};

const mapMain = (state = initialState, action) => {
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

export default mapMain;
