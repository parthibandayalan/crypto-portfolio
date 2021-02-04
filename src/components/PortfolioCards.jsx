import React, { useState, useEffect, useRef } from "react";
import CryptoCard from "./CryptoCard";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { SettingsRemoteSharp } from "@material-ui/icons";

import TotalPortfolioValue from "../components/TotalPortfolioValue";

export default function PortfolioCards() {
  // const [totalValue, setTotalValue] = useState(0.0);
  const [items, setItems] = useState([]);
  const coins = useSelector((state) => state.coins.coins);

  //const reload = useSelector((state) => state.trigger.boolTrigger);
  //const dispatch = useDispatch();
  /*
  var itemsList = [];
    console.log(JSON.stringify(coins));
    for (const [key, value] of Object.entries(coins)) {
      console.log(key, value);
      let eachItem = {
        text: key + "-USD",
        onClick: () => {
          return history.push({
            pathname: "/lightchart",
            state: { coinCode: key },
          });
        },
      };
      itemsList.push(eachItem);
    }    
    setItems(itemsList);
    dispatch(resetTrigger());    
   */

  useEffect(() => {
    var itemsList = [];
    for (const [symbol, tokens] of Object.entries(coins)) {
      itemsList.push({
        symbol,
        tokens,
      });
    }
    setItems(itemsList);
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>Your Portfolio</Typography>
      </Grid>
      <Grid item>
        <TotalPortfolioValue />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={false} md={2} />
        <Grid item xs={12} sm={12} md={8} container spacing={2}>
          {items.map((item, index) => {
            // console.log("item : " + JSON.stringify(item));
            //const { symbol, tokens } = item;
            return (
              <CryptoCard
                key={item["symbol"]}
                symbol={item["symbol"]}
                tokens={item["tokens"]}
              />
            );
          })}
        </Grid>
        <Grid item xs={false} sm={false} md={2} />
      </Grid>
    </Grid>
  );
}
