import React, { useState, useEffect, useRef } from "react";
import CryptoCard from "./CryptoCard";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import TotalPortfolioValue from "../components/TotalPortfolioValue";

export default function PortfolioCards() {
  // const [totalValue, setTotalValue] = useState(0.0);
  const [items, setItems] = useState([]);
  const coins = useSelector((state) => state.coins.coins);

  useEffect(() => {
    var itemsList = [];
    for (const [symbol, { token, image, id }] of Object.entries(coins)) {
      itemsList.push({
        symbol,
        tokens: token,
        image,
        id,
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
            return <CryptoCard key={item["symbol"]} details={item} />;
          })}
        </Grid>
        <Grid item xs={false} sm={false} md={2} />
      </Grid>
    </Grid>
  );
}
