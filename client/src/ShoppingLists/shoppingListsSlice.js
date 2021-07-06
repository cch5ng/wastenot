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
  const response = await http_requests.Lists.postShoppingList({ list, cookieStr });
  if (response && response.type === 'success') {
    let guid = Object.keys(response.shoppingList);
    guid = guid[0];
    let shortShoppingList = {name: list.name,
      guid};
    return {
      message: response.message,
      shoppingList: shortShoppingList,
    }
  }
});

export const editShoppingList = createAsyncThunk('shoppingLists/editShoppingList', async ({ list, cookieStr }) => {
  const response = await http_requests.Lists.putShoppingList({ list, cookieStr });
  if (response && response.type === 'success') {
    let shortShoppingList = {name: list.name,
      guid: list.guid};
    return {
      message: response.message,
      shoppingList: shortShoppingList,
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
        let {shoppingList} = action.payload;
        let {guid} = shoppingList;
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
        let { guid, name } = action.payload.shoppingList;
        let curList = state.shoppingLists.entities[guid];
        if (curList.name !== name) {
          curList.name = name;
        }
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
        const { deletedGuid, message } = action.payload;
        state.message = message;
        let idIdx = state.shoppingLists.ids.indexOf(deletedGuid);
        state.shoppingLists.ids.splice(idIdx, 1);
        delete state.shoppingLists.entities[deletedGuid];
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