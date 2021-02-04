import React, { useState, useEffect } from "react";
import { createChart, line } from "lightweight-charts";
//import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import getHistoricalData from "./../services/BinanceHistoryDataAPI";

const HEIGHT = 600;

let chart;
let candlestickSeries;

export default function RealTimeChart() {
  const chartRef = React.useRef();
  const legendRef = React.useRef();
  const location = useLocation();

  // const legend = "Legend test";
  const legend = location.state.coinCode + "-USDT";
  const decimals = 0.0;

  const [lineSeries, setLineSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    chart = createChart(chartRef.current, {
      width: chartRef.current.offsetWidth,
      height: HEIGHT,
      alignLabels: true,
      timeScale: {
        rightOffset: 0,
        barSpacing: 15,
        fixLeftEdge: false,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: "#fff000",
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      priceScale: {
        autoScale: true,
      },
      /*watermark: {
        color: "rgba(0, 0, 0, 0.7)",
        visible: true,
        text: "TxQuick",
        fontSize: 18,
        horzAlign: "left",
        vertAlign: "bottom",
      },*/
    });

    candlestickSeries = chart.addLineSeries();
  }, []);

  useEffect(() => {
    ////////////////////////////////////////
    getHistoricalData(location.state.coinCode)
      .then((incD) => {
        //console.log("received by the component : " + JSON.stringify(incD));
        //setIncomingData(incD);
        // const oldLineData = lineSeries[0]["data"];
        // const newLineSeries = [
        //   {
        //     data: [...oldLineData, ...incD],
        //   },
        // ];
        //setLineSeries(newLineSeries);
        candlestickSeries.setData(incD);
        //console.log("received by the component : ");
        //console.log(newLineSeries);
      })
      .catch((error) => {
        throw error;
      });
    ////////////////////////////////////////
  }, [location.state.coinCode]);

  //   React.useEffect(() => {
  //     candlestickSeries.update(lastCandle);
  //   }, [lastCandle]);

  ////////////////below code is for websocket

  const API_WS =
    "wss://stream.binance.com:9443/ws/" +
    location.state.coinCode.toLowerCase() +
    "usdt@ticker";
  var conn = new WebSocket(API_WS);
  console.log(conn);
  console.log(JSON.stringify(location.state.coinCode));
  conn.onmessage = (e) => {
    console.log("value : ");
    console.log(e);
    var newKlineMap = JSON.parse(e.data);
    const newPoint = {
      time: newKlineMap.E / 1000,
      value: parseFloat(newKlineMap.c),
    };

    // console.log(newKlineMap.k.t + " " + newKlineMap.k.o);
    // console.log("Value : " + newPoint.value);
    candlestickSeries.update(newPoint);
  };

  ///////////////////////

  React.useEffect(() => {
    const handler = () => {
      chart.resize(chartRef.current.offsetWidth, HEIGHT);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div
      ref={chartRef}
      id="chart"
      style={{ position: "relative", width: "100%" }}
    >
      <div
        ref={legendRef}
        style={{
          position: "absolute",
          zIndex: 2,
          color: "#333",
          padding: 10,
        }}
      >
        {legend}
      </div>
    </div>
  );
}

// CandleChart.propTypes = {
//   legend: PropTypes.string,
//   initCandles: PropTypes.array,
//   lastCandle: PropTypes.object,
//   decimals: PropTypes.number,
// };
