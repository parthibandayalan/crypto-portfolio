import { handleCheckCoin, handleRemoveCoinReq } from "./handlers/CoinHandlers";
import { CHECK_COIN, REMOVE_COIN_REQ } from "./../ducks/CoinDucks";
import { takeLatest } from "redux-saga/effects";
import {
  handleLoginUser,
  handleRefreshToken,
  handleLogoutUser,
} from "./handlers/Authentication";
import {
  LOGIN_USER,
  REFRESH_TOKEN,
  LOGOUT_USER,
} from "../ducks/Authentication";

export function* watcherSaga() {
  yield takeLatest(CHECK_COIN, handleCheckCoin);
  yield takeLatest(LOGIN_USER, handleLoginUser);
  yield takeLatest(LOGOUT_USER, handleLogoutUser);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
  yield takeLatest(REMOVE_COIN_REQ, handleRemoveCoinReq);
}
