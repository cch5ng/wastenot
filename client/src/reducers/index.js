import { combineReducers } from 'redux';
import authenticate from './authenticate';
import shoppingLists from './shoppingLists';
import listTemplates from './listTemplates';
import setting from './setting';

export default combineReducers({
  authenticate,
  shoppingLists,
  listTemplates,
  setting,
});
