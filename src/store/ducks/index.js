import agency from './agency';
import mapMain from './mapMain';
import detail from './detail';
import user from './users';
import login from './login';
import {combineReducers} from 'redux';

export default combineReducers({
  mapMain,
  login,
  user,
  agency,
  detail,
});
