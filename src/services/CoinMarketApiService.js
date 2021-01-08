import axios from "axios";
const API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info";

export function checkSymbol(strSymbol) {
  return axios
    .get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info`, {
      headers: {
        "X-CMC_PRO_API_KEY": "554d8fe4-3311-4db0-8dfa-7d243d1e1de6",
      },
      params: { symbol: strSymbol },
    })
    .then((res) => {
      return res.data;
      /*console.log(res.data);
      const responseTodos = res.data;
      setData(responseTodos);*/
    })
    .catch((error) => {
      throw "Invalid Symbol";
    });
}
