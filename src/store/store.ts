import { configureStore } from '@reduxjs/toolkit';
import dialecticalReducer from './dialecticalSlice';

export const store = configureStore({
  reducer: {
    dialectical: dialecticalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 