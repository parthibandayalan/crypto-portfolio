import { setSnackbar } from "../../ducks/Snackbar";
import { addCoin } from "../../ducks/CoinDucks";
import { call, put } from "redux-saga/effects";
import { checkSymbol } from "../../../services/CoinMarketApiService";
import checkSymbolBinanceApi from "../requests/CoinRequest";
import getHistoricalData from "../../../services/BinanceHistoryDataAPI";

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
    yield put(addCoin(symbol, token));
    yield put(setSnackbar(true, "success", "Your coin is added"));
  } catch (error) {
    console.log(error);
    yield put(setSnackbar(true, "error", JSON.stringify(error)));
  }
}
