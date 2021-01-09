import React, { useState, useEffect } from "react";
import Chart from "kaktana-react-lightweight-charts";
import getHistoricalData from "./../services/BinanceHistoryDataAPI";
import { useLocation } from "react-router-dom";

export default function LightChartComponent() {
  // URL connection
  /*const miniTicker = new WebSocket(
    "wss://dex.binance.org/api/ws/BNB_BTCB-1D@miniTicker"
  );*/

  // Or Subscribe method

  const location = useLocation();

  const options = {
    alignLabels: true,
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: true,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: "#fff000",
      visible: true,
      timeVisible: true,
      secondsVisible: false,
    },
  };

  const [lineSeries, setLineSeries] = useState([
    {
      data: [],
    },
  ]);

  /////below code is for getting historical data and setting up the lineSeries data
  /* {
          time: "2018-10-19",
          value: 180.34,
        },
        {
          time: "2018-10-22",
          value: 180.82,
        },
        {
          time: "2018-10-23",
          value: 175.77,
        },
        {
          time: "2018-10-24",
          value: 178.58,
        },
        {
          time: "2018-10-25",
          value: 177.52,
        },
        {
          time: "2018-10-26",
          value: 176.88,
        },
        {
          time: "2018-10-29",
          value: 173.74,
        },
        {
          time: "2018-10-30",
          value: 173.16,
        },
        {
          time: "2018-10-31",
          value: 177.98,
        },
        const lineSeries = [
    {
      data: [],
    },
  ];*/

  useEffect(() => {
    //lineSeries[0]["data"].push(incomingData);
    // console.log(
    //   lineSeries[0]["data"].push({ time: "2018-11-01", value: 180.98 })
    // );
    getHistoricalData(location.state.coinCode)
      .then((incD) => {
        //console.log("received by the component : " + JSON.stringify(incD));
        //setIncomingData(incD);
        const oldLineData = lineSeries[0]["data"];
        const newLineSeries = [
          {
            data: [...oldLineData, ...incD],
          },
        ];
        setLineSeries(newLineSeries);
        //console.log("received by the component : ");
        //console.log(newLineSeries);
      })
      .catch((error) => {
        throw error;
      });
  }, [location.state.coinCode]);

  //////////below code is for websocket
  const API_WS =
    "wss://stream.binance.com:9443/ws/" +
    location.state.coinCode +
    "usdt@kline_10m";
  const conn = new WebSocket(API_WS);

  conn.onmessage = (e) => {
    console.log("value : ");
    console.log(e.data);
    var newKlineMap = JSON.parse(e.data);
    const newPoint = {
      time: newKlineMap.k.t / 1000,
      value: parseFloat(newKlineMap.k.o),
    };

    //console.log(newKlineMap.k.t + " " + newKlineMap.k.o);
    //console.log("Value : " + newPoint.value);
    const oldLineData = lineSeries[0]["data"];
    const newLineSeries = [
      {
        data: [...oldLineData, newPoint],
      },
    ];
    setLineSeries(newLineSeries);
  };

  return (
    <div>
      <Chart options={options} lineSeries={lineSeries} autoWidth height={800} />
    </div>
  );
}
