import React, { useState, useEffect, useRef } from "react";
import CryptoCard from "./CryptoCard";
import { Grid, Typography } from "@material-ui/core";
import Immutable from "immutable";
import { useSelector } from "react-redux";
import { SettingsRemoteSharp } from "@material-ui/icons";

export default function PortfolioCards() {
  const [totalValue, setTotalValue] = useState(0.0);
  const [items, setItems] = useState([]);
  const coins = useSelector((state) => state.coins.coins);

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
    /*coins.forEach((tokens, symbol) => {
      itemsList.push({
        symbol,
        tokens,
      });
    });*/
    setItems(itemsList);
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>Your Portfolio</Typography>
      </Grid>
      <Grid item>
        <Typography>
          Total Portfolio value :{" "}
          {totalValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
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
