import axios from "axios";

export async function getHistoricalData(symbol) {
  const pairing = symbol + "USDT";
  const instance = axios.create();

  return instance
    .get(`https://api.binance.com/api/v3/klines`, {
      params: { symbol: pairing, interval: "1d", limit: 1000 },
    })
    .then((res) => {
      const cdata = res.data.map((d) => {
        return {
          time: d[0] / 1000,
          value: parseFloat(d[1]),
        };
      });
      return cdata;
    })
    .catch((error) => {
      throw "Invalid Symbol";
    });
}

export async function getAveragePrice(symbol) {
  const pairing = symbol + "USDT";

  // const instance = axios.create({
  //   baseURL: "http://localhost:8080",
  // });

  const instance = axios.create();

  return instance
    .get(`https://api.binance.com/api/v3/avgPrice`, {
      params: { symbol: pairing },
    })
    .then((res) => {
      //console.log(res.data.price);
      return res.data.price;
    })
    .catch((error) => {
      throw "Invalid Symbol " + JSON.stringify(error);
    });
}

export async function getCoinDetails(id) {
  const instance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
  });

  return instance.get(`/coins/markets`, {
    params: {
      vs_currency: "usd",
      ids: id,
    },
  });
}
