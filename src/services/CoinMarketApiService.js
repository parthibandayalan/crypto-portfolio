import axios from "axios";
const API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info";

export function checkSymbol(strSymbol) {
  let queryParams = {
    symbol: strSymbol,
  };

  return axios
    .get(API_URL, {
      headers: { "X-CMC_PRO_API_KEY": "554d8fe4-3311-4db0-8dfa-7d243d1e1de6" },
      params: ,
    })
    .then((response) => response)
    .catch((error) => error);
}

/*axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  */
