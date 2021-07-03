import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../Auth/authSlice';
import settingReducer from '../Settings/settingSlice';
import shoppingListsReducer from '../ShoppingLists/shoppingListsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
    shoppingLists: shoppingListsReducer,
  },
})