import Immutable from 'seamless-immutable';

export const Types = {
  SET_LANG: 'user/SET_LANG',
};

const initialState = Immutable({
  loading: false,
  error: false,
  i18nKey: '',
});

export const Creators = {
  upadateI18n: data => {
    return {type: Types.SET_LANG, payload: {data}};
  },
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_LANG: {
      return {
        ...state,
        loading: true,
        i18nKey: action.payload.data,
      };
    }
    case 'mapMain/SET_LANG': {
      return {
        ...state,
        loading: true,
        i18nKey: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export default login;
