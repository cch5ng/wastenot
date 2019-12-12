import { combineReducers } from 'redux';
import authenticate from './authenticate';
//import lists from './lists';
import listTemplates from './listTemplates';

export default combineReducers({
  authenticate,
  //lists,
  listTemplates,
});
