import { setSnackbar } from "../../ducks/Snackbar";
import { addCoin } from "../../ducks/CoinDucks";
import { call, put } from "redux-saga/effects";
import getHistoricalData from "../../../services/BinanceHistoryDataAPI";
import { addCoinToDb } from "../../../services/PortfolioServices";

export function* handleCheckCoin(action) {
  //yield put(setSnackbar(true, "success", "Your coin is added"));
  try {
    console.log("Check Coin caught" + JSON.stringify(action));
    const { symbol, token } = action;
    console.log(
      "Symbol : " + JSON.stringify(symbol) + " Token " + JSON.stringify(token)
    );
    if (isNaN(token) || Number(token) < 0) {
      throw "Enter Valid Number";
    }
    //const response = yield call(checkSymbol, symbol);
    //yield call(checkSymbolBinanceApi, symbol);
    yield call(getHistoricalData, symbol);
    //console.log("Response : " + JSON.stringify(response));
    const serializedState = localStorage.getItem("state");
    if (serializedState != null) {
      const state = JSON.parse(serializedState);
      console.log("Local Storage : " + JSON.stringify(state.auth.username));
      const payload = {
        coin: symbol,
        tokens: token,
        username: state.auth.username,
      };
      if (state.auth.authenticated) {
        console.log("Coin added to database");
        yield call(addCoinToDb, payload);
      }
    }

    yield put(addCoin(symbol, token));
    yield put(setSnackbar(true, "success", "Your coin is added"));
  } catch (error) {
    console.log(error);
    yield put(setSnackbar(true, "error", JSON.stringify(error)));
  }
}
