import { combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./reduxSaga/RootSaga";
import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./UserSlice";
import userDataReducer from './UserData';
import authReducer from './auth';
import requestReducer from './RequestErrors'

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user']
}

const reducer = combineReducers({
    auth: authReducer,
    user: userDataReducer,
    userSlice: userReducer,
    requestErrors: requestReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(watcherSaga)

export const persistor = persistStore(store)

