import main from './main';
import mapMain from './mapMain';
import user from './users';
import loign from './login';
import {combineReducers} from 'redux';

export default combineReducers({
  main,
  mapMain,
  user,
  loign,
});
