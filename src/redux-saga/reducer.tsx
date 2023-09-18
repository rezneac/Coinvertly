const initialState = {
  currencyRate: [], // Initialize as an empty array
};

function currencyReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'First_Update':
      return {...state, currencyRate: action.currencyRate};
    default:
      return state;
  }
}

export default currencyReducer;
