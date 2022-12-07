import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { userPreferencesReducer } from './reducers/userPreferencesReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const Store = configureStore({
    reducer: {
      user: userReducer,
      preferences: persistReducer(persistConfig, userPreferencesReducer),
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

