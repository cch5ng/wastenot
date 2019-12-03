import { SHOPPING_LISTS_FETCH, SHOPPING_LISTS_FETCH_ERR, SHOPPING_LISTS_FETCH_SUCCESS
  //RECEIVE_ADD_TEMPLATE_LIST, RECEIVE_TEMPLATE_LISTS, RECEIVE_EDIT_TEMPLATE_LIST, RECEIVE_DELETE_TEMPLATE_LIST, REQUEST_TEMPLATE_LISTS, REQUEST_ADD_TEMPLATE_LIST, REQUEST_EDIT_TEMPLATE_LIST, REQUEST_DELETE_TEMPLATE_LIST
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

const listTemplates = (state = initialState, action) => {
  let listObj = {}
  switch(action.type) {
    case SHOPPING_LISTS_FETCH:
      return {
        ...state,
        status: 'fetching'
      }
    case SHOPPING_LISTS_FETCH_ERR:
      return {
        ...state,
        status: 'error',
        message: action.message
      }
    case SHOPPING_LISTS_FETCH_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        shoppingLists: action.shoppingLists
      }
    // case RECEIVE_ADD_TEMPLATE_LIST:
    // case RECEIVE_EDIT_TEMPLATE_LIST:
    //   return {
    //     ...state,
    //     listTemplates: {...state.listTemplates, ...action.normListObj}
    //   }
    // case RECEIVE_LISTS:
    //   let categoriesObj = action.lists.reduce(list => {
    //     listObj[list.id] = list
    //     return listObj
    //   }, {})
    //   return {
    //     ...state,
    //     lists: listObj
    //   }
    // case RECEIVE_DELETE_LIST:
    //   listObj[action.list.id] = null
    //   return {
    //     ...state,
    //     lists: {...state.lists, ...listObj}
    //   }
    // case REQUEST_LISTS:
    // case REQUEST_ADD_LIST:
    // case REQUEST_EDIT_LIST:
    // case REQUEST_DELETE_LIST:
    default:
      return state
  }
}

export default listTemplates;
