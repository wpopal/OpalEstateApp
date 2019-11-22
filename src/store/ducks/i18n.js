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
    console.log('dataaaaa', data);
    return {type: Types.SET_LANG, payload: {data}};
  },
};

const login = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case Types.SET_LANG: {
      console.log('action.payload.data', action.payload.data);
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
