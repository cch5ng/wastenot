import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../Auth/authSlice';
import settingReducer from '../Settings/settingSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
  },
})