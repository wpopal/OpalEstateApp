import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'mapMain/GET_REQUEST',
  GET_SUCCESS: 'mapMain/GET_SUCCESS',
  GET_FAILURE: 'mapMain/GET_FAILURE',
  SET_GEO: 'mapMain/SET_GEO',
  SET_POP: 'mapMain/SET_POP',
  SET_SETTING: 'mapMain/SET_SETTING',
};

const initialState = Immutable({
  loading: false,
  error: false,
  data: [],
  geoLocal: {latitude: '', longitude: ''},
  PopularCiti: '',
  paramsSetting: {
    amenities: '',
    cat: '',
    info: '',
    types: '',
    status: '',
    max_area: '',
    min_area: '',
    geo_long: '',
    geo_lat: '',
    max_price: '',
    min_price: '',
    city: '',
    search_text: '',
  },
});

export const Creators = {
  getmapMainSuccess: data => {
    return {
      type: Types.GET_SUCCESS,
      payload: {data},
    };
  },

  setSettingmapMainSuccess: data => {
    console.log('data', data);
    return {
      type: Types.SET_SETTING,
      payload: {data},
    };
  },

  setGeo: data => ({
    type: Types.SET_GEO,

    payload: {data},
  }),

  setPopularCiti: data => ({
    type: Types.SET_POP,

    payload: {data},
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

    case Types.GET_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    }

    case Types.SET_SETTING: {
      return {
        ...state,
        paramsSetting: action.payload.data,
        loading: false,
      };
    }

    case Types.SET_GEO: {
      console.log(action.payload.data);
      return {
        ...state,
        PopularCiti: '',
        geoLocal: action.payload.data,
      };
    }
    case Types.SET_POP: {
      console.log(action.payload.data);
      return {
        ...state,
        geoLocal: {latitude: '', longitude: ''},
        PopularCiti: action.payload.data,
      };
    }
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
