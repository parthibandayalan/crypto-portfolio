import React, { useState } from "react";
import { Typography, Button, Box, TextField, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { checkCoin } from "../redux/ducks/CoinDucks";

const useStyles = makeStyles((theme) => ({
  blockBox: {
    display: "block",
    padding: theme.spacing(2, 2),
  },
  inlineBlockBox: { display: "inline-block" },
}));

export default function AddCoin() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [strSymbol, setStrSymbol] = useState("");
  const [token, setToken] = useState("");

  const handleCoinChange = (e) => setStrSymbol(e.target.value);
  const handleTokenChange = (e) => setToken(e.target.value);

  return (
    <div>
      <Box className={classes.inlineBlockBox}>
        <Card>
          <Typography variant="h6" className={classes.blockBox} align="center">
            Add Coin
          </Typography>
          <Box className={classes.blockBox}>
            <TextField
              id="symbol"
              label="Crypto Symbol"
              variant="outlined"
              onChange={handleCoinChange}
            />
          </Box>
          <Box className={classes.blockBox}>
            <TextField
              id="token"
              label="Number of Tokens"
              variant="outlined"
              onChange={handleTokenChange}
            />
          </Box>
          <Box className={classes.blockBox}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(checkCoin(strSymbol, token))}
            >
              Add
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
