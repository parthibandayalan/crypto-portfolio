import { CoinbasePro } from "coinbase-pro-node";
import Binance from "node-binance-api";

export default async function checkSymbolBinanceApi(symbol) {
  const binance = new Binance().options({
    APIKEY: "l9rBENLLTmWOxhaZhXZumkvXaUZM6h768c28nZYzaIT7mAbe2mC72FpkU67uMO4K",
    APISECRET:
      "sthlXgSGMOImGSRpM3Q7lWq6H3jh5hJnPYKwuUMqT3fXrta5AhyYLXB122dotvRf",
  });
  const pairing = symbol + "USDT";

  try {
    let ticker = await binance.prices(pairing);
    console.info("Price of BTC : ", ticker[pairing]);
  } catch (error) {
    throw "Coin not supported";
  }
  //    (error, ticker) => {
  //     try {
  //       console.info("Price of BTC : ", ticker[pairing] + " Error : " + error);
  //     } catch (err) {
  //       console.log(err);
  //       throw "Coin not supported";
  //     }});
}

/*export default function checkSymbolWebSocket(symbol) {
  //const {CoinbasePro} = require('coinbase-pro-node');

  const auth = {
    apiKey: "c667149b215cea51d41da304fb8f70dd",
    apiSecret:
      "9/R0ZPeb6pM1Jg8CFQw7irZ+nAoec5O9LxGPY0YMFqydS1kF+7+DkK8/d05wbHrAlmxrQND4WupFYp3VOyB8Vg==",
    passphrase: "pleasework",
    // The Sandbox is for testing only and offers a subset of the products/assets:
    // https://docs.pro.coinbase.com/#sandbox
    useSandbox: false,
  };

  const client = new CoinbasePro(auth);

  client.rest.account.listAccounts().then((accounts) => {
    const message = `You can trade "${accounts.length}" different pairs.`;
    console.log(message);
  });

  client.rest.product
    .getProducts()
    .then((product) => {
      console.log(JSON.stringify(product));
    })
    .catch((error) => {
      console.log("Error Caught : " + error);
    });
}



function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
    console.log("Timer Running");
  }
}

export default async function checkSymbolWebSocket(strSymbol) {
  var ws = new WebSocket("wss://ws-feed.pro.coinbase.com");
  const subscribe = {
    type: "subscribe",
    channels: [
      {
        name: "ticker",
        product_ids: strSymbol + "-USD",
      },
    ],
  };

  var subscriptionReplied = false;

  ws.onopen = () => {
    ws.send(JSON.stringify(subscribe));
    console.log(" subscribe send : " + JSON.stringify(subscribe));
  };

  ws.onmessage = (e) => {
    subscriptionReplied = true;
    //JSON.parse(e.data.type);
    const value = JSON.parse(e.data);
    console.log("Inside Machine");
    console.log(JSON.stringify(value));
    if (value.type == "subscriptions") {
      //ws.close();
    } else if (e.data.type == "error") {
      ws.close();
      throw "Invalid Symbol or Symbol not Supported";
    }
  };

  for (let i = 0; i < 10; ++i) {
    if (subscriptionReplied == true) {
      console.log(JSON.stringify(subscriptionReplied));
      return;
    }
    await sleep(300);
  }
  throw "Socket Issue : ";
}*/
