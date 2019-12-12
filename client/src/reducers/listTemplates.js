import { SHOPPING_LISTS_FETCH, SHOPPING_LISTS_FETCH_ERR, SHOPPING_LISTS_FETCH_SUCCESS,
  TEMPLATE_LISTS_FETCH, TEMPLATE_LISTS_FETCH_ERR, TEMPLATE_LISTS_FETCH_SUCCESS,
  TEMPLATE_LISTS_ADD_FETCH, TEMPLATE_LISTS_ADD_FETCH_ERR, TEMPLATE_LISTS_ADD_FETCH_SUCCESS,
  TEMPLATE_LISTS_DELETE_FETCH_SUCCESS, TEMPLATE_LISTS_EDIT_FETCH_SUCCESS,
  TEMPLATE_LIST_FETCH_SUCCESS
} from '../actions/listTemplates';

const listTemplates = (state = { listTemplates: {} }, action) => {
  let listObj = {}
  switch(action.type) {
    case TEMPLATE_LISTS_FETCH:
    case TEMPLATE_LISTS_ADD_FETCH:
      return {
        ...state,
        status: 'fetching'
      }
    case TEMPLATE_LISTS_FETCH:
      return {
        ...state,
        status: 'fetching',
        curListTemplate: {}
      }
    case TEMPLATE_LISTS_FETCH_ERR:
    case TEMPLATE_LISTS_ADD_FETCH_ERR:
      return {
        ...state,
        status: 'error',
        message: action.message
      }
    case TEMPLATE_LISTS_FETCH_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        listTemplates: action.listTemplates
      }
    case TEMPLATE_LISTS_ADD_FETCH_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        listTemplates: {...state.listTemplates, ...action.listTemplate}
      }
    case TEMPLATE_LISTS_DELETE_FETCH_SUCCESS:
      let listTemplatesToUpdate = {...state.listTemplates};
      let key = action.guid;
      delete listTemplatesToUpdate[key];
      return {
        ...state,
        status: 'success',
        message: action.message,
        listTemplates: listTemplatesToUpdate
      }
    case TEMPLATE_LIST_FETCH_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        curListTemplate: action.listTemplate
      }
    case TEMPLATE_LISTS_EDIT_FETCH_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message
      }

    // case REQUEST_EDIT_LIST:
    default:
      return state
  }
}

export default listTemplates;
