export const CHECK_COIN = "CHECK_COIN";
export const REMOVE_COIN_REQ = "REMOVE_COIN_REQ";
const ADD_COIN = "ADD_COIN";
const REMOVE_COIN = "REMOVE_COIN";
const RESET_COIN = "RESET_COIN";

const intialState = {
  coins: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ADD_COIN:
      let { symbol, token } = action;
      //console.log("ADD COIN Reducer " + symbol + " " + token);
      //const newMap = state.coins.set(symbol, token);
      var newState = {
        coins: { ...state.coins },
      };
      newState.coins[symbol] = token;
      return newState;
    case REMOVE_COIN:
      delete state.coins[action.symbol];
      var newState = {
        coins: { ...state.coins },
      };
      return newState;
    case RESET_COIN:
      return intialState;
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

export const removeCoin = (symbol) => ({
  type: REMOVE_COIN,
  symbol,
});

export const removeCoinReq = (symbol) => ({
  type: REMOVE_COIN_REQ,
  symbol,
});

export const resetCoins = () => ({
  type: RESET_COIN,
});
