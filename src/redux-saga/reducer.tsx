const initialState = {
  AllRates: {
    baseValue: 'USD',
    currencyRate: [],
    cryptoRates: [],
  },
};

function currencyReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'First_Update':
      return {
        ...state,
        AllRates: {
          ...state.AllRates,
          currencyRate: action.payload.currencyRate,
          cryptoRates: action.payload.cryptoRate,
        },
      };
    default:
      return state;
  }
}

export default currencyReducer;
