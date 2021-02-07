import axios from "axios";
import PortfolioCards from "../components/PortfolioCards";

//const API_URL = "http://localhost:8080";
const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create();

export function getPortfolio(username) {
  instance.defaults.withCredentials = true;
  const url = `${API_URL}/portfolio/${username}`;
  return instance
    .get(url)
    .then((response) => response.data)
    .catch((err) =>
      console.log("Get User details didnt work" + JSON.stringify(err))
    );
}

export function addCoinToDb(coinInfo) {
  instance.defaults.withCredentials = true;
  const url = `${API_URL}/coins/add`;
  let payload = {
    coin: coinInfo.coin,
    tokens: coinInfo.tokens,
    username: coinInfo.username,
  };

  return instance
    .post(url, payload)
    .then((response) => response.status === 200)
    .catch((err) => console.log("Add Coin Database : " + JSON.stringify(err)));
}

export function removeCoinFromDb(coinInfo) {
  instance.defaults.withCredentials = true;
  const url = `${API_URL}/coins/remove`;
  let payload = {
    coin: coinInfo.coin,
    username: coinInfo.username,
  };

  return instance
    .post(url, payload)
    .then((response) => response.status === 200)
    .catch((err) =>
      console.log("Remove Coin from Database : " + JSON.stringify(err))
    );
}

export function checkUsernameExist(username) {
  const url = `${API_URL}/portfolio/checkusername`;
  let payload = {
    username,
  };
  return instance
    .post(url, payload)
    .then((res) => res.status === 200)
    .catch((res) => false);
}

export function createUser(values) {
  const url = `${API_URL}/portfolio/create`;
  console.log(JSON.stringify(values));
  return instance
    .post(url, values)
    .then((res) => {
      return res.status === 200;
    })
    .catch((res) => {
      console.log("Response in Portfolio : " + JSON.stringify(res));
      return false;
    });
}
