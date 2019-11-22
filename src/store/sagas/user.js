import {Creators as userActions} from '../../store/ducks/users';
import {Creators as i18nActions} from '../../store/ducks/i18n';

export function* setLangSaga() {
  console.log('i18nActions', i18nActions);
  console.log('userActions', userActions);
}
