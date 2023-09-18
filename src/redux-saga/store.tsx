// import {configureStore, applyMiddleware, compose} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import mySaga from './sagas';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga);

export default store;
