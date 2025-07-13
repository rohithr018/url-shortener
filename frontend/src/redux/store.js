// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    PURGE,
    FLUSH,
    PAUSE,
    PERSIST,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import themeReducer from './themeSlice';

const persistConfig = {
    key: 'theme',
    storage,
};

const persistedThemeReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
    reducer: {
        theme: persistedThemeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
