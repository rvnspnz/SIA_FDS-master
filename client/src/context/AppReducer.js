const appReducer = (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        success: 'Successfully added',
        error: null
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload,
        success: null
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        error: null,
        success: null
      };
    default:
      return state;
  }
};

export default appReducer;
