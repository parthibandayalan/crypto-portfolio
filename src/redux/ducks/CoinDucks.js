export const CHECK_COIN = "CHECK_COIN";
const ADD_COIN = "ADD_COIN";

const initialState = {
  coins: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COIN:
      let { symbol, token } = action;
      //console.log("ADD COIN Reducer " + symbol + " " + token);
      if (symbol in state.coins) {
        token = Number(token) + Number(state.coins[symbol]);
      }
      return {
        ...state,
        coins: {
          ...state.coins,
          [symbol]: token,
        },
      };
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
