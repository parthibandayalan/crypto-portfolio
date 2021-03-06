import { call, put } from "redux-saga/effects";
import { setAuthenticated } from "../../ducks/Authentication";
import {
  authenticateUser,
  refreshToken,
  cancelToken,
} from "../requests/Authentication";
import { refreshToken as refresh } from "../../ducks/Authentication";
import store from "../../ConfigureStore";
import { setSnackbar } from "../../ducks/Snackbar";
import { getPortfolio } from "../../sagas/requests/Authentication";
import { addCoin, resetCoins } from "../../ducks/CoinDucks";

export function* handleLoginUser(action) {
  try {
    console.log("handler caught");

    const response = yield call(authenticateUser, action.payload);
    console.log("handler caught response : " + JSON.stringify(response));

    let authentication = false;
    let username = action.payload.username;
    let coins = null;
    let name = "";
    if (response.status === 200) {
      authentication = true;
      const res = yield call(getPortfolio, username);
      console.log("returned data : " + JSON.stringify(res));
      localStorage.setItem("portfolio", JSON.stringify(res));
      username = res.username;
      name = res.name;
      coins = res.coins;
      yield put(resetCoins());
      console.log("Response : " + JSON.stringify(name));
      if (coins != null) {
        for (const [key, value] of Object.entries(coins)) {
          yield put(addCoin(key, value.tokens, value.id, value.image));
          console.log(key, value);
        }
      }
    }
    //const { authentication } = response;
    yield put(setAuthenticated(authentication, username, name));
    yield put(setSnackbar(true, "success", "Log In Successful"));
  } catch (error) {
    console.log("Error caught : " + error);
    let authentication = false;
    let username = null;
    yield put(setAuthenticated(authentication));
    yield put(setSnackbar(true, "error", "Log In UnSuccessful"));
  }
}

export function* handleRefreshToken(action) {
  try {
    console.log("handler caught");
    const response = yield call(refreshToken);
    console.log("handler caught response : " + JSON.stringify(response));
    let authentication = false;
    if (response.status === 200) {
      authentication = true;
    }
    //const { authentication } = response;
    yield put(setAuthenticated(authentication));
  } catch (error) {
    let authentication = false;
    yield put(setAuthenticated(authentication));
    //console.log(error);
  }
}

export function* handleLogoutUser(action) {
  try {
    const response = yield call(cancelToken);
    console.log("handler caught response : " + JSON.stringify(response));
    //const { authentication } = response;
    yield put(resetCoins());
    yield put(setAuthenticated(false, null, null));
    yield put(setSnackbar(true, "success", "Log Out Successful"));
  } catch (error) {
    yield put(resetCoins());
    yield put(setAuthenticated(false, null, null));
    yield put(setSnackbar(true, "success", "Log Out Successful"));
    //console.log(error);
  }
}
