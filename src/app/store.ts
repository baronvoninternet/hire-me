import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import childlistReducer from '../features/childlist/childlistSlice';

export const store = configureStore({
  reducer: {
    childlist: childlistReducer,
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
