import React from "react";
import { Typography, Button, Box, TextField, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { checkCoin } from "../redux/ducks/CoinDucks";

const useStyles = makeStyles((theme) => ({
  blockBox: {
    display: "block",
    padding: theme.spacing(1, 1),
  },
  inlineBlockBox: { display: "inline-block" },
}));

export default function AddCoin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      <Box className={classes.inlineBlockBox}>
        <Card>
          <Typography variant="h6" className={classes.blockBox} align="center">
            Add Coin
          </Typography>
          <Box className={classes.blockBox}>
            <TextField id="symbol" label="Crypto Symbol" variant="outlined" />
          </Box>
          <Box className={classes.blockBox}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(checkCoin("BTC"))}
            >
              Add
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
