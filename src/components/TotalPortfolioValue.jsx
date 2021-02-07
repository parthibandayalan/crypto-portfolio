import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { resetTrigger } from "../redux/ducks/Trigger";

export default function TotalPortfolioValue() {
  const dispatch = useDispatch();
  const [totalValue, setTotalValue] = useState(0.0);
  const totValues = useSelector((state) => state.totValues.coins);
  const reload = useSelector((state) => state.trigger.boolTrigger);

  const [noOfCoins, setNoOfCoins] = useState(0);

  useEffect(() => {
    //console.log(JSON.stringify(totValues));

    var tempTotValue = 0.0;
    setNoOfCoins(0);

    for (const [symbol, values] of Object.entries(totValues)) {
      console.log(JSON.stringify(symbol) + " " + JSON.stringify(values));
      tempTotValue = parseFloat(tempTotValue) + parseFloat(values);
      setNoOfCoins(noOfCoins + 1);
    }
    setTotalValue(tempTotValue);
    dispatch(resetTrigger());
    console.log("No of Coins : " + JSON.stringify(noOfCoins));
  }, [reload]);

  return (
    <div>
      <Typography>
        Total Portfolio value :{" "}
        {console.log("No of Coins : " + JSON.stringify(noOfCoins))}
        {noOfCoins > 0
          ? totalValue.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : 0}
      </Typography>
    </div>
  );
}
