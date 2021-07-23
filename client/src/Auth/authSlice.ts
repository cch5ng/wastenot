import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction
} from '@reduxjs/toolkit'
import * as serviceWorker from '../sw';

import http_requests from '../utils/http_requests';
import { getCookieStr } from '../utils/utils';

interface AuthState {
  isLoggedIn: boolean;
  hasButtonClicked: boolean;
  authStr: null | string;
  message: null | string;
  status: null | string;
  error: null | any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  hasButtonClicked: false,
  authStr: null,
  message: null,
  status: null,
  error: null
}

type AuthParams = {
  email: string;
  password: string
}

interface RegisterResponse {
  cookie: string;
  message: string
}

export const register = createAsyncThunk('auth/register', async ({ email, password }: AuthParams) => {
  const response = await http_requests.Auth.postRegister(email, password);
  return (await response) as RegisterResponse;
})

export const login = createAsyncThunk('auth/login', async ({ email, password }: AuthParams) => {
  const response = await http_requests.Auth.postLogin(email, password);
  return (await response) as RegisterResponse;


  // let cookieAr;

  // if (response.cookie && storageAvailable('sessionStorage')) {
  //   cookieAr = response.cookie.split('=');
  //   sessionStorage.setItem(cookieAr[0], cookieAr[1]);
  //   return {
  //     message: response.message,
  //     authStr: cookieAr[1]
  //   }
  // }
  // serviceWorker.subscribeUserToPush();

})

export const logout = createAsyncThunk('auth/logout', async () => {
  let cookie;
  const cookieKey = 'sessionStr';
  let cookieVal = sessionStorage.getItem(cookieKey);
  cookie = `${cookieKey}=${cookieVal}`;

  const response = await http_requests.Auth.postLogout({ cookie })
  sessionStorage.removeItem(`${cookieKey}`);
  serviceWorker.unsubscribeUserFromPush();

  if (response) {
    return {
      message: response.message,
    }  
  }
})

export const isAuthenticated = createAsyncThunk('auth/isAuthenticated', async () => {
  let cookie;
  const cookieKey = 'sessionStr';
  let cookieVal = getCookieStr();
  cookie = `${cookieKey}=${cookieVal}`;

  if (cookieVal) {
    const response = await http_requests.Auth.postAuthenticated({ cookie: cookieVal })
    let cookieAr;
  
    return {
      message: response.message,
      authStr: cookieVal
    }
  } else {
    return {
      message: 'invalid authentication'
    }
  }
})

interface RegisterPayloadFail {
  error: any
}

interface RegisterPayloadSuccess {
  message: string,
  cookie: string,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [register.fulfilled]: (state, action: PayloadAction<RegisterPayloadSuccess>) => {
      if (state.status === 'loading') {
        let cookieAr;

        if (action.payload.cookie && storageAvailable('sessionStorage')) {
          cookieAr = action.payload.cookie.split('=');
          sessionStorage.setItem(cookieAr[0], cookieAr[1]);
        }

        state.message = action.payload.message;
        state.authStr = cookieAr[1];
        state.status = 'succeeded'
      }
    },
    [register.rejected]: (state, action: PayloadAction<RegisterPayloadFail>) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload
      }
    },
    [login.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [login.fulfilled]: (state, action: PayloadAction<RegisterPayloadSuccess>) => {
      if (state.status === 'loading') {
        let cookieAr;
        if (action.payload.cookie && storageAvailable('sessionStorage')) {
          cookieAr = action.payload.cookie.split('=');
          sessionStorage.setItem(cookieAr[0], cookieAr[1]);
        }

        state.status = 'succeeded'
        state.message = action.payload.message;
        state.authStr = cookieAr[1];
        state.isLoggedIn = true;
        serviceWorker.subscribeUserToPush();
      }
    },
    [login.rejected]: (state, action: PayloadAction<RegisterPayloadFail>) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload
      }
    },
    [logout.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [logout.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        state.message = action.payload.message;
        state.status = 'succeeded';
        state.isLoggedIn = false;
        state.authStr = '';
      }
    },
    [logout.rejected]: (state, action: PayloadAction<RegisterPayloadFail>) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload
      }
    },
    [isAuthenticated.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    [isAuthenticated.fulfilled]: (state, action: PayloadAction<RegisterPayloadSuccess>) => {
      if (state.status === 'loading') {
        state.message = action.payload.message;
        state.authStr = action.payload.authStr;
        state.status = 'succeeded'
      }
    },
    [isAuthenticated.rejected]: (state, action: PayloadAction<RegisterPayloadFail>) => {
      if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.payload
      }
    },
  },
})

//helper
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

export default authSlice.reducer;