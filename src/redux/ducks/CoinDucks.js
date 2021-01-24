import Immutable from "immutable";
export const CHECK_COIN = "CHECK_COIN";
const ADD_COIN = "ADD_COIN";
const RESET_COIN = "RESET_COIN";

export default (state = Immutable.Map({}), action) => {
  switch (action.type) {
    case ADD_COIN:
      let { symbol, token, rate } = action;
      //console.log("ADD COIN Reducer " + symbol + " " + token);
      //const newMap = state.coins.set(symbol, token);
      return state.setIn([symbol], token);
    case RESET_COIN:
      return Immutable.Map({});
    default:
      return state;
  }
};

export const checkCoin = (symbol, token) => ({
  type: CHECK_COIN,
  symbol,
  token,
});

export const addCoin = (symbol, token) => ({
  type: ADD_COIN,
  symbol,
  token,
});

export const resetCoins = () => ({
  type: RESET_COIN,
});
