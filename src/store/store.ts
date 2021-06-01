import { combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./reduxSaga/rootSaga";
import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userDataReducer from './reducers/userData';
import authReducer from './reducers/auth';
import handleErrorsReducer from './reducers/handleErrors'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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
    handleErrors: handleErrorsReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

