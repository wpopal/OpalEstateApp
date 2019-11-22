import {Creators as i18nActions} from '../ducks/i18n';
import {Creators as userActions} from '../ducks/users';

export function* setLangSaga(action) {
  i18nActions.upadateI18n(action.payload.data);
}
