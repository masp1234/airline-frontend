import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, PAUSE, REGISTER, PURGE, PERSIST, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { searchFlightDataSlice } from '../redux/searchFlightReduser.ts';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  searchFlightData: searchFlightDataSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
