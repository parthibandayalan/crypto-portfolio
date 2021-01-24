import React, { useState, useEffect, useRef } from "react";
import CryptoCard from "./CryptoCard";
import { Grid, Typography } from "@material-ui/core";
import Immutable from "immutable";
import { useSelector } from "react-redux";
import { SettingsRemoteSharp } from "@material-ui/icons";

export default function PortfolioCards() {
  const [totalValue, setTotalValue] = useState(0.0);
  const [items, setItems] = useState([]);
  const coins = Immutable.Map(useSelector((state) => state.coins));

  useEffect(() => {
    var itemsList = [];
    coins.forEach((tokens, symbol) => {
      itemsList.push({
        symbol,
        tokens,
      });
    });
    setItems(itemsList);
  }, [coins.size]);

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
              <CryptoCard symbol={item["symbol"]} tokens={item["tokens"]} />
            );
          })}
        </Grid>
        <Grid item xs={false} sm={false} md={2} />
      </Grid>
    </Grid>
  );
}
