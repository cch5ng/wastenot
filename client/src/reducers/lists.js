import { RECEIVE_ADD_LIST, RECEIVE_LISTS, RECEIVE_EDIT_LIST, RECEIVE_DELETE_LIST,
  REQUEST_LISTS, REQUEST_ADD_LIST, REQUEST_EDIT_LIST, REQUEST_DELETE_LIST,
  LISTS_FETCH, LISTS_ERR, LISTS_SUCCESS } from '../actions/lists';

const initialState = {
  lists: {
    'id00001': {
      "listId": "id00001",
      "listName": "Trader Joe's",
      "listItemInputs": {
        "shoppingListItem0": {
          "id": "shoppingListItem0",
          "name": "soda water",
          "section": "drinks",
          "parentId": "id00001",
          "done": true
        },
        "shoppingListItem1": {
          "id": "shoppingListItem1",
          "name": "ice cream",
          "section": "frozen",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem2": {
          "id": "shoppingListItem2",
          "name": "meatballs",
          "section": "none",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem3": {
          "id": "shoppingListItem3",
          "name": "eggs",
          "section": "none",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem4": {
          "id": "shoppingListItem4",
          "name": "turkey",
          "section": "none",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem5": {
          "id": "shoppingListItem5",
          "name": "romaine lettuce",
          "section": "none",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem6": {
          "id": "shoppingListItem6",
          "name": "honey crisp apples",
          "section": "none",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem7": {
          "id": "shoppingListItem7",
          "name": "dried seaweed",
          "section": "none",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem8": {
          "id": "shoppingListItem8",
          "name": "pasta sauce",
          "section": "none",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem9": {
          "id": "shoppingListItem9",
          "name": "yogurt",
          "section": "dairy",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem10": {
          "id": "shoppingListItem10",
         "name": "indian dinner",
          "section": "frozen",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem11": {
          "id": "shoppingListItem11",
          "name": "wontons",
          "section": "frozen",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem12": {
          "id": "shoppingListItem12",
          "name": "squash",
          "section": "produce",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem13": {
          "id": "shoppingListItem13",
          "name": "almond milk",
          "section": "dairy",
          "parentId": "id00001",
          "done": false
        },
        "shoppingListItem14": {
          "id": "shoppingListItem14",
          "name": "probiotic",
          "section": "drinks",
          "parentId": "id00001",
          "done": false
        }
      }
    },
    'id00002': {
      'listId': 'id00002',
      "listName": 'walmart',
      "listItemInputs": {
        "shoppingListItem0": {
          "name": 'roast chicken',
          "section": 'deli',
          "parentId": 'id00002',
          "done": true
        },
        "shoppingListItem1": {
          "name": 'salads',
          "section": 'produce',
          "parentId": 'id00002',
          "done": false
        },
        "shoppingListItem2": {
          "name": "meatballs",
          "section": "none",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem3": {
          "name": "eggs",
          "section": "none",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem4": {
          "name": "turkey",
          "section": "none",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem5": {
          "name": "romaine lettuce",
          "section": "none",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem6": {
          "name": "honey crisp apples",
          "section": "none",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem7": {
          "name": "dried seaweed",
          "section": "none",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem8": {
          "name": "pasta sauce",
          "section": "none",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem9": {
          "name": "yogurt",
          "section": "dairy",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem10": {
          "name": "indian dinner",
          "section": "frozen",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem11": {
          "name": "wontons",
          "section": "frozen",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem12": {
          "name": "squash",
          "section": "produce",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem13": {
          "name": "almond milk",
          "section": "dairy",
          "parentId": "id00002",
          "done": false
        },
        "shoppingListItem14": {
          "name": "probiotic",
          "section": "drinks",
          "parentId": "id00002",
          "done": false
        }
      }
    }
  }
}

export function lists (state = initialState, action) {
  let listObj = {}
  switch(action.type) {
    case LISTS_FETCH:
      return {
        ...state,
        status: 'fetching'
      }
    case LISTS_ERR:
      return {
        ...state,
        status: 'error'
      }
    case LISTS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message
      }
    // case RECEIVE_ADD_LIST:
    // case RECEIVE_EDIT_LIST:
    //   return {
    //     ...state,
    //     lists: {...state.lists, ...action.normListObj},
    //     retrieving: false,
    //   }
    // case RECEIVE_DELETE_LIST:
    //   listObj[action.listId] = null;
    //   let listId = action.listId;
    //   return {
    //     ...state,
    //     lists: {...state.lists, [listId]: null}
    //   }
    // case REQUEST_LISTS:
    // case REQUEST_ADD_LIST:
    // case REQUEST_EDIT_LIST:
    // case REQUEST_DELETE_LIST:
    //   return {
    //     ...state,
    //     retrieving: true,
    //   }
    default:
      return state;
  }
}

    // case RECEIVE_LISTS:
    //   let categoriesObj = action.lists.reduce(list => {
    //     listObj[list.id] = list
    //     return listObj
    //   }, {})
    //   return {
    //     ...state,
    //     lists: listObj
    //   }

    // case RECEIVE_EDIT_LIST:
    //   listObj[action.list.id] = action.list
    //   return {
    //     ...state,
    //     lists: {...state.lists, ...listObj}
    //   }