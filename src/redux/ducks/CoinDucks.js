export const CHECK_COIN = "CHECK_COIN";

export const checkCoin = (strCoin) => ({
  type: CHECK_COIN,
  payload: strCoin,
});
