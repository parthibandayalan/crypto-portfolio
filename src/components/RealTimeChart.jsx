import React, { useState, useEffect, useRef } from "react";
import { createChart, line } from "lightweight-charts";
import { useDispatch } from "react-redux";
//import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import getHistoricalData from "./../services/BinanceHistoryDataAPI";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { getAveragePrice } from "../services/BinanceHistoryDataAPI";
import { removeCoinReq } from "../redux/ducks/CoinDucks";

const HEIGHT = 600;

let chart;
let candlestickSeries;

export default function RealTimeChart() {
  const chartRef = React.useRef();
  const legendRef = React.useRef();
  const location = useLocation();
  var previousTime = 0.0;

  // const legend = "Legend test";
  const symbol = location.state.coinCode;
  const legend = symbol + "-USDT";
  const tokens = location.state.tokens;
  const decimals = 0.0;

  const dispatch = useDispatch();

  const [rate, setRate] = useState(0.0);

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
        lockVisibleTimeRangeOnResize: false,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: "#fff000",
        visible: true,
        timeVisible: true,
        secondsVisible: false,
        shiftVisibleRangeOnNewBar: true,
        autoScale: true,
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
        console.log(JSON.stringify(incD));
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
  useEffect(() => {
    // console.log(conn);
    // console.log(JSON.stringify(location.state.coinCode));
    conn.onmessage = (e) => {
      // console.log("value : ");
      // console.log(e);
      var newKlineMap = JSON.parse(e.data);
      const newPoint = {
        time: newKlineMap.E / 1000,
        value: parseFloat(newKlineMap.c),
      };

      // console.log(newKlineMap.k.t + " " + newKlineMap.k.o);
      console.log("Value : " + JSON.stringify(newPoint));
      candlestickSeries.update(newPoint);
      setRate(parseFloat(newKlineMap.c));
      // chart.timeScale().fitContent();
      // if (previousTime <= newPoint.time) {
      //   console.log("Time Update : " + previousTime);
      //   candlestickSeries.update(newPoint);
      //   previousTime = newPoint.time;
      // }
    };
    return () => {
      conn.close();
    };
  });

  /////////////////////////////////////

  // useInterval(() => {
  //   // console.log("Interval running in the background " + JSON.stringify(symbol));
  //   getAveragePrice(symbol)
  //     .then((res) => {
  //       setRate(parseFloat(res));
  //     })
  //     .catch((err) => console.log(err));
  // }, 1000);

  ///////////////////////////////////////////

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
    <Card>
      <Grid container>
        <Grid item container justify="center">
          <Grid>
            <Typography>{legend}</Typography>{" "}
          </Grid>
        </Grid>
        <Grid item container justify="space-around">
          <Typography>
            Rate :{" "}
            {rate.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
          <Typography>Tokens : {tokens} </Typography>
          <Typography>
            Value :{" "}
            {(parseFloat(rate) * parseFloat(tokens)).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </Grid>
        <Grid item container>
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
        </Grid>
        <Grid item container justify="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(removeCoinReq(symbol))}
          >
            Remove Coin
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// CandleChart.propTypes = {
//   legend: PropTypes.string,
//   initCandles: PropTypes.array,
//   lastCandle: PropTypes.object,
//   decimals: PropTypes.number,
// };
