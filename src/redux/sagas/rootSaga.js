import { handleCheckCoin } from "./handlers/CoinHandlers";
import { CHECK_COIN } from "./../ducks/CoinDucks";
import { takeLatest } from "redux-saga/effects";

export function* watcherSaga() {
  yield takeLatest(CHECK_COIN, handleCheckCoin);
}
