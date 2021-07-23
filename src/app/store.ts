import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import childListReducer from '../features/childList/childListSlice';

export const store = configureStore({
  reducer: {
    childList: childListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
