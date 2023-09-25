import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';

import mySaga from './sagas';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export default store;
