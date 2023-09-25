import {call, put, takeEvery, all} from 'redux-saga/effects';
import {useCurrencyHandler} from '../apiHandler/useCurrencyHandler';

function* fetchCurrecyRate(): Generator<any, void, any> {
  const [getLatestRates, getLatestRatesCrypto, getCurrencyConvert] = useCurrencyHandler();

  try {
    const [currencyRate, cryptoRate] = yield all([call(getLatestRates), call(getLatestRatesCrypto)]);
    yield put({
      type: 'First_Update',
      payload: {currencyRate, cryptoRate},
    });
  } catch (error) {
    console.log(error);
  }
}

function* mySaga() {
  yield takeEvery('FETCH_CURRENCY_RATE', fetchCurrecyRate);
}

export default mySaga;
