import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/User/slice';
import sessionStorage from 'redux-persist/es/storage/session';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
    user:userReducer,
});

const persistConfig = {
    key: 'root',
    storage:sessionStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);