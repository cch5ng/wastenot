import { SHOPPING_LISTS_FETCH, SHOPPING_LISTS_FETCH_ERR, SHOPPING_LISTS_FETCH_SUCCESS,
  TEMPLATE_LISTS_FETCH, TEMPLATE_LISTS_FETCH_ERR, TEMPLATE_LISTS_FETCH_SUCCESS,
  TEMPLATE_LISTS_ADD_FETCH, TEMPLATE_LISTS_ADD_FETCH_ERR, TEMPLATE_LISTS_ADD_FETCH_SUCCESS,
  TEMPLATE_LISTS_DELETE_FETCH_SUCCESS, TEMPLATE_LISTS_EDIT_FETCH_SUCCESS,
  TEMPLATE_LIST_FETCH_SUCCESS
} from '../actions/listTemplates';

const initialState = {
  listTemplates: {
    'tid00001': {
      "listId": "tid00001",
      "listName": "Trader Joe's",
      "listItemInputs": {
        "shoppingListItem0": {
          "name": "soda water",
          "section": "drinks",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem1": {
          "name": "bottle water",
          "section": "drinks",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem2": {
          "name": "green tea",
          "section": "drinks",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem3": {
          "name": "creamer",
          "section": "dairy",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem4": {
          "name": "probiotic",
          "section": "dairy",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem5": {
          "name": "yogurt",
          "section": "dairy",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem6": {
          "name": "indian dinner",
          "section": "frozen",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem7": {
          "name": "wontons",
          "section": "frozen",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem8": {
          "name": "honey crisp apples",
          "section": "produce",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem9": {
          "name": "yogurt",
          "section": "dairy",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem10": {
          "name": "salad",
          "section": "deli",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem11": {
          "name": "slice luncheon meat",
          "section": "deli",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem12": {
          "name": "greens",
          "section": "produce",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem13": {
          "name": "carrots",
          "section": "produce",
          "parentId": "tid00001",
          "done": false
        },
        "shoppingListItem14": {
          "name": "dried seaweed",
          "section": "snacks",
          "parentId": "tid00001",
          "done": false
        }
      }
    },
    'tid00002': {
      "listId": "tid00002",
      "listName": "Walmart",
      "listItemInputs": {
        "shoppingListItem0": {
          "name": "roasted chix",
          "section": "deli",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem1": {
          "name": "salads",
          "section": "produce",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem2": {
          "name": "sandwich rolls",
          "section": "deli",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem3": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem4": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem5": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem6": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem7": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem8": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem9": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem10": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem11": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem12": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem13": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        },
        "shoppingListItem14": {
          "name": "",
          "section": "none",
          "parentId": "tid00002",
          "done": false
        }
      }
    }
  }
}

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
    // case REQUEST_EDIT_LIST:
    default:
      return state
  }
}

export default listTemplates;
