import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { resetTrigger } from "../redux/ducks/Trigger";

export default function TotalPortfolioValue() {
  const dispatch = useDispatch();
  const [totalValue, setTotalValue] = useState(0.0);
  const totValues = useSelector((state) => state.totValues.coins);
  const reload = useSelector((state) => state.trigger.boolTrigger);

  useEffect(() => {
    //console.log(JSON.stringify(totValues));

    var tempTotValue = 0.0;

    for (const [symbol, values] of Object.entries(totValues)) {
      tempTotValue = parseFloat(tempTotValue) + parseFloat(values);
    }
    setTotalValue(tempTotValue);
    dispatch(resetTrigger());
  }, [reload]);

  return (
    <div>
      <Typography>
        Total Portfolio value :{" "}
        {totalValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </Typography>
    </div>
  );
}
