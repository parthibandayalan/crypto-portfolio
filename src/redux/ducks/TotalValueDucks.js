const ADD_VALUE = "ADD_VALUE";
const REMOVE_VALUE = "REMOVE_VALUE";
const RESET_VALUES = "RESET_VALUES";

const intialState = {
  coins: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ADD_VALUE:
      let { symbol, totValue } = action;
      //console.log("ADD COIN Reducer " + symbol + " " + token);
      //const newMap = state.coins.set(symbol, token);
      var newState = {
        coins: { ...state.coins },
      };
      newState.coins[symbol] = totValue;
      return newState;
    case REMOVE_VALUE:
      delete state.coins[action.symbol];
      var newState = {
        coins: { ...state.coins },
      };
      return newState;
    case RESET_VALUES:
      return intialState;
    default:
      return state;
  }
};

export const addValue = (symbol, totValue) => ({
  type: ADD_VALUE,
  symbol,
  totValue,
});

export const removeValue = (symbol) => ({
  type: REMOVE_VALUE,
  symbol,
});

export const resetValues = () => ({
  type: RESET_VALUES,
});
