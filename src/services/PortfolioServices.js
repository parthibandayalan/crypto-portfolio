import axios from "axios";

const API_URL = "http://localhost:8080";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export function getPortfolio(username) {
  instance.defaults.withCredentials = true;
  const url = `${API_URL}/portfolio/${username}`;
  return instance.get(url).then((response) => response.data);
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
    .then((response) => response.status === 200);
}
