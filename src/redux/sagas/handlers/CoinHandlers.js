import setSnackbar from "../../ducks/Snackbar";
import { call, put } from "redux-saga/effects";
import { checkSymbol } from "../../../services/CoinMarketApiService";

export function* handleCheckCoin(action) {
  //yield put(setSnackbar(true, "success", "Your coin is added"));
  try {
    console.log("Check Coin caught" + JSON.stringify(action));
    let strSymbol = action.payload;
    console.log("Symbol : " + JSON.stringify(strSymbol));
    const response = yield call(checkSymbol, action.payload);
    console.log("Symbol : " + JSON.stringify(response));
    //yield put(setSnackbar(true, "success", "Your coin is added"));
  } catch (error) {
    /*console.log(
      "error while launching set snack bar action" + JSON.stringify(error)
    );*/
    //yield put(setSnackbar(true, "error", "Your coin is added"));
  }
}
