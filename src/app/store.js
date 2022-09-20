import { configureStore } from '@reduxjs/toolkit';
import {storeReducer} from './storeReducer';

export const store = configureStore({
  reducer: {
    store: storeReducer,
  },
});