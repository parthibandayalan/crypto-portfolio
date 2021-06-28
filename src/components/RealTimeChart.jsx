import React, { useState, useEffect, useRef } from "react";
import { createChart, line } from "lightweight-charts";
import { useDispatch } from "react-redux";
//import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { getHistoricalData } from "./../services/CryptoAPIService";
import { Card, Typography, Grid, Button, makeStyles } from "@material-ui/core";

import { removeCoinReq } from "../redux/ducks/CoinDucks";

const HEIGHT = 600;

let chart;
let candlestickSeries;

const useStyles = makeStyles((theme) => ({
  mainCard: {
    width: 1000,
  },
  titleItems: {
    display: "flex",
    direction: "row",
    alignItems: "left",
  },
}));

export default function RealTimeChart() {
  const chartRef = React.useRef();
  const legendRef = React.useRef();
  const location = useLocation();

  const classes = useStyles();

  const symbol = location.state.coinCode;
  const legend = symbol + "-USDT";

  const { token, id, image } = location.state.value;

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
    });

    candlestickSeries = chart.addLineSeries();
  }, []);

  useEffect(() => {
    ////////////////////////////////////////
    getHistoricalData(location.state.coinCode)
      .then((incD) => {
        //console.log(JSON.stringify(incD));
        candlestickSeries.setData(incD);
      })
      .catch((error) => {
        throw error;
      });
    ////////////////////////////////////////
  }, [location.state.coinCode]);

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
      //console.log("Value : " + JSON.stringify(newPoint));
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

  useEffect(() => {
    const handler = () => {
      chart.resize(chartRef.current.offsetWidth, HEIGHT);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <Card className={classes.mainCard}>
      <Grid container>
        <Grid item container justify="center">
          <Grid>
            <div className={classes.titleItems}>
              <img src={image} width="30" height="30" />{" "}
              <Typography variant="h5">{legend}</Typography>{" "}
            </div>
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
          <Typography>Tokens : {token} </Typography>
          <Typography>
            Value :{" "}
            {(parseFloat(rate) * parseFloat(token)).toLocaleString("en-US", {
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
            style={{
              backgroundColor: "red",
            }}
            onClick={() => dispatch(removeCoinReq(symbol))}
          >
            Remove Coin
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
