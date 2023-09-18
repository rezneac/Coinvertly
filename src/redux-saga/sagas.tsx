import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {useCurrencyHandler} from '../apiHandler/useCurrencyHandler';

function* fetchCurrecyRate(action: any) {
  const [getLatestRates, getLatestRatesCrypto] = useCurrencyHandler();

  try {
    const currencyRate = getLatestRates();
    yield put({
      type: 'First_Update',
      currencyRate: currencyRate,
    });
  } catch (error) {
    console.log(error);
  }
}

function* mySaga() {
  yield takeEvery('FETCH_CURRENCY_RATE', fetchCurrecyRate);
}

export default mySaga;
