import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'agency/GET_REQUEST',
  GET_SUCCESS: 'agency/GET_SUCCESS',
  GET_FAILURE: 'agency/GET_FAILURE',

  GET_REQUEST_agent: 'agent/GET_REQUEST_agent',
  GET_SUCCESS_agent: 'agent/GET_SUCCESS_agent',
  GET_FAILURE_agent: 'agent/GET_FAILURE_agent',
};

const initialState = Immutable({
  loadingAgent: true,
  loading: true,
  error: false,
  errorAgent: false,
  data: [],
  dataAgent: [],
});

export const Creators = {
  getagencyRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getagencySuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {data},
  }),

  getagencyFailure: () => ({
    type: Types.GET_FAILURE,
  }),

  getagentRequest: () => ({
    type: Types.GET_REQUEST_agent,
  }),

  getagentSuccess: data => ({
    type: Types.GET_SUCCESS_agent,
    payload: {data},
  }),

  getagentFailure: () => ({
    type: Types.GET_FAILURE_agent,
  }),
};

const agency = (state = initialState, action) => {
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

    case Types.GET_REQUEST_agent:
      return {
        ...state,
        loadingAgent: true,
      };

    case Types.GET_SUCCESS_agent:
      return {
        ...state,
        dataAgent: action.payload.data,
        loadingAgent: false,
      };

    case Types.GET_FAILURE_agent:
      return {
        ...state,
        loadingAgent: false,
        errorAgent: true,
      };

    default:
      return state;
  }
};

export default agency;
