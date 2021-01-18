import axios from "axios";

export default async function getHistoricalData(symbol) {
  const pairing = symbol + "USDT";

  //https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000
  //axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

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
      //console.log("immediatly after fetching from api : ");
      //console.log(cdata);
      return cdata;
    })
    .catch((error) => {
      throw "Invalid Symbol";
    });
}
