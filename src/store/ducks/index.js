import main from './main';
import mapMain from './mapMain';
import user from './users';
import {combineReducers} from 'redux';

export default combineReducers({
  main,
  mapMain,
  user,
});
