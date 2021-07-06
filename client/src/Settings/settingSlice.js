import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import http_requests from '../utils/http_requests';
import { getCookieStr } from '../utils/utils';

export const userIsUsingExpiration = createAsyncThunk('setting/userIsUsingExpiration', async ({cookieStr}) => {
  if (cookieStr) { 
    const response = await http_requests.Setting.postListItemMapSetting(cookieStr)
    if (response && response.type === 'success') {
      return {
        message: response.message,
        isUsingExpiration: response.mapped_items_to_categories,
      }
    }
  } else {
    return { message: 'settings could not be retrieve; auth issue' }
  }
})

const initialState = { hasButtonClicked: false };

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
  },
  extraReducers: {
    [userIsUsingExpiration.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [userIsUsingExpiration.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.message = action.payload.message
      state.isUsingExpiration = action.payload.isUsingExpiration
    },
    [userIsUsingExpiration.rejected]: (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload
      }
    },
  },
});

export default settingSlice.reducer;