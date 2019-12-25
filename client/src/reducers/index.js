import { combineReducers } from 'redux';
import authenticate from './authenticate';
import shoppingLists from './shoppingLists';
import listTemplates from './listTemplates';

export default combineReducers({
  authenticate,
  shoppingLists,
  listTemplates,
});
