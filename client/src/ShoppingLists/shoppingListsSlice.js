import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import * as serviceWorker from '../sw';

import http_requests from '../utils/http_requests';
import { getCookieStr, arrayToObj } from '../utils/utils';

// const shoppingListsAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.date.localeCompare(a.date)
// })

//TODO stub out the async thunks and extra reducers
//export const XXX = createAsyncThunk('shoppingLists/YYY', async () => {
//});

export const fetchShoppingLists = createAsyncThunk('shoppingLists/fetchShoppingLists', async ({ cookieStr }) => {
  const response = await http_requests.Lists.getAllShoppingLists({ cookieStr });
  if (response && response.shoppingLists) {
    let shoppingListsObj = arrayToObj(response.shoppingLists);
    return {
      message: response.message,
      shoppingLists: shoppingListsObj
    }
  }
});

export const createShoppingList = createAsyncThunk('shoppingLists/createShoppingList', async ({ list, cookieStr }) => {
  const response = await http_requests.Lists.postShoppingList({ list, cookieStr })
  if (response) {
    let guid = Object.keys(response.shoppingList)[0];
    let shortShoppingList = {name: response.shoppingList[guid].name,
      guid};
    if (response.type === 'success') {
      return {
        message: response.message,
        shoppingList: shortShoppingList,
        guid
      }
    }
  }
});

export const editShoppingList = createAsyncThunk('shoppingLists/editShoppingList', async ({ list, cookieStr }) => {
  const response = await http_requests.Lists.putShoppingList({ list, cookieStr });
  if (response && response.type === 'success') {
    return {
      message: response.message,
      shoppingList: list
    }
  }
});

export const deleteShoppingList = createAsyncThunk('shoppingLists/deleteShoppingList', async ({ guid, cookieStr }) => {
  const response = await http_requests.Lists.deleteTemplateList({ guid, cookieStr });
  if (response && response.type === 'success') {
    return {
      message: response.message,
      deletedGuid: response.guid
    }
  }
});



/*

export const fetchShoppingListDelete = ({ guid, cookieStr }) => dispatch => {
  dispatch({ type: SHOPPING_LISTS_FETCH });

  if (cookieStr) {
    http_requests.Lists.deleteTemplateList({ guid, cookieStr })
      .then(response => {
        if (response.type === 'success') {
          dispatch(
            { type: SHOPPING_LISTS_DELETE_FETCH_SUCCESS,
              message: response.message,
              deletedGuid: response.guid
            }
          )
        }
      })
      .catch(function(err) {
        dispatch({ type: SHOPPING_LISTS_ERR, message: err.message});
        console.log('fetch err: ' + err.message)
      })
  }
}

*/

const initialState = {
  shoppingLists: {
    ids: [],
    entities: {},
  },
  message: 'no shopping lists have been retrieved',
}

const shoppingListsSlice = createSlice({
  name: 'shoppingLists',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchShoppingLists.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchShoppingLists.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        state.message = action.payload.message;

        state.shoppingLists.entities = action.payload.shoppingLists;
        state.shoppingLists.ids = Object.keys(state.shoppingLists.entities);
        state.status = 'succeeded'
      }
    },
    [fetchShoppingLists.rejected]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload //error.message
      }
    },

    [createShoppingList.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [createShoppingList.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        state.message = action.payload.message;
        let {guid, shoppingList} = action.payload;
        state.shoppingLists.ids.push(guid);
        state.shoppingLists.entities[guid] = shoppingList;
        state.status = 'succeeded'
      }
    },
    [createShoppingList.rejected]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload //error.message
      }
    },

    [editShoppingList.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [editShoppingList.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        state.message = action.payload.message;
        let updatedList = action.payload.shoppingList;
        //TODO TEST
        let updatedShoppingLists = state.shoppingLists.entities.filter(list => list.guid !== updatedList.guid);
        updatedShoppingLists.push(updatedList);
        state.shoppingLists.entities = updatedShoppingLists;
        state.status = 'succeeded'
      }
    },
    [editShoppingList.rejected]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload //error.message
      }
    },

    [deleteShoppingList.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [deleteShoppingList.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        state.message = action.payload.message;
        //TODO TEST
        let filteredShoppingLists = state.shoppingLists.shoppingLists.filter(list => list.guid !== action.payload.deletedGuid);
        state.shoppingLists = filteredShoppingLists;
        state.status = 'succeeded'
      }
    },
    [deleteShoppingList.rejected]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload //error.message
      }
    },

  },
})

export default shoppingListsSlice.reducer;