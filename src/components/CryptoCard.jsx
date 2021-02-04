import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addValue } from "../redux/ducks/TotalValueDucks";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
} from "@material-ui/core";
import { getAveragePrice } from "../services/BinanceHistoryDataAPI";
import { setTrigger } from "../redux/ducks/Trigger";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 200,
    width: 250,
  },
}));

export default function CryptoCard(props) {
  const classes = useStyles();
  const { symbol, tokens } = props;

  const title = symbol + "-USD";

  const [rate, setRate] = useState(0.0);

  const dispatch = useDispatch();

  useInterval(() => {
    // console.log("Interval running in the background " + JSON.stringify(symbol));
    getAveragePrice(symbol)
      .then((res) => {
        setRate(parseFloat(res));
        dispatch(
          addValue(symbol, JSON.stringify(parseFloat(res) * parseFloat(tokens)))
        );
        dispatch(setTrigger());
      })
      .catch((err) => console.log(err));
  }, 1000);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardHeader title={title} />
        <CardContent>
          <Typography>
            Rate :{" "}
            {rate.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
          <Typography>Tokens : {tokens}</Typography>
          <Typography>
            Value :{" "}
            {(parseFloat(rate) * parseFloat(tokens)).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
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
