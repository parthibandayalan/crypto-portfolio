import { setSnackbar } from "../../ducks/Snackbar";
import { addCoin, removeCoin } from "../../ducks/CoinDucks";
import { setTrigger } from "../../ducks/Trigger";
import { call, put } from "redux-saga/effects";
import {
  getHistoricalData,
  getCoinDetails,
} from "../../../services/CryptoAPIService";
import {
  addCoinToDb,
  removeCoinFromDb,
} from "../../../services/PortfolioServices";

export function* handleCheckCoin(action) {
  //yield put(setSnackbar(true, "success", "Your coin is added"));
  try {
    console.log("Check Coin caught" + JSON.stringify(action));
    const { id, token } = action;

    if (isNaN(token) || Number(token) < 0) {
      throw "Enter Valid Number";
    }
    //const response = yield call(checkSymbol, symbol);
    const response = yield call(getCoinDetails, id);
    console.log(response);
    const symbol = response.data[0].symbol.toUpperCase();
    const image = response.data[0].image;
    yield call(getHistoricalData, symbol);
    //console.log("Response : " + JSON.stringify(response));
    const serializedState = localStorage.getItem("state");
    if (serializedState != null) {
      const state = JSON.parse(serializedState);
      console.log("Local Storage : " + JSON.stringify(state.auth.username));
      const payload = {
        coin: symbol,
        tokens: token,
        id: id,
        image: image,
        username: state.auth.username,
      };
      if (state.auth.authenticated) {
        console.log("Coin added to database");
        yield call(addCoinToDb, payload);
      }
    }

    yield put(addCoin(symbol, token, id, image));
    yield put(setTrigger());
    yield put(setSnackbar(true, "success", "Your coin is added"));
  } catch (error) {
    console.log(error);
    yield put(setSnackbar(true, "error", JSON.stringify(error)));
  }
}

///////////Remove Coin Request Handler
export function* handleRemoveCoinReq(action) {
  //yield put(setSnackbar(true, "success", "Your coin is added"));
  try {
    console.log("Ramove Coin caught" + JSON.stringify(action));
    const { symbol, token } = action;
    console.log(
      "Symbol : " + JSON.stringify(symbol) + " Token " + JSON.stringify(token)
    );

    //const response = yield call(checkSymbol, symbol);
    //yield call(checkSymbolBinanceApi, symbol);
    //yield call(getHistoricalData, symbol);
    //console.log("Response : " + JSON.stringify(response));
    const serializedState = localStorage.getItem("state");
    if (serializedState != null) {
      const state = JSON.parse(serializedState);
      console.log("Local Storage : " + JSON.stringify(state.auth.username));
      const payload = {
        coin: symbol,
        username: state.auth.username,
      };
      if (state.auth.authenticated) {
        console.log("Coin added to database");
        yield call(removeCoinFromDb, payload);
      }
    }

    yield put(removeCoin(symbol));
    yield put(setTrigger());
    yield put(setSnackbar(true, "success", "Coin is removed"));
  } catch (error) {
    console.log(error);
    yield put(setSnackbar(true, "error", JSON.stringify(error)));
  }
}
