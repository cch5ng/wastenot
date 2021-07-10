import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../Auth/authSlice';
import settingReducer from '../Settings/settingSlice';
import shoppingListsReducer from '../ShoppingLists/shoppingListsSlice';

export const store =  configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
    shoppingLists: shoppingListsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch