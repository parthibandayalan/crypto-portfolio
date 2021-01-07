import { combineReducers, createStore, applyMiddleware } from "redux";
import snackbarReducer from "./ducks/Snackbar";
import coinReducer from "./ducks/CoinDucks";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  coins: coinReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

sagaMiddleware.run(watcherSaga);

export default store;
