import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  Box,
} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { useHistory, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CryptoChart from "../components/CryptoChart";
import { Route } from "react-router-dom";
import AddCoin from "./../components/AddCoin";
import LightChart from "./../components/LightChartComponent";

const drawerWidth = 240;
const appBarHeight = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    height: "calc(100% - 64px)",
    top: 64,
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  title: {
    flexGrow: 1,
  },
  contentIn: {
    marginTop: appBarHeight,
  },
  content: {
    marginTop: appBarHeight,
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
  },
  blockBox: {
    display: "block",
  },
  inlineBlockBox: { display: "inline-block" },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashboard({ match }) {
  const history = useHistory();
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const coins = useSelector((state) => state.coins.coins);

  const [isLoggedIn, setLogged] = useState(true);

  const itemsList = [
    {
      text: "ETH-USD",
      onClick: () =>
        history.push({
          pathname: "/lightchart",
          state: { coinCode: "ETH" },
        }),
    },
  ];

  for (const [key, value] of Object.entries(coins)) {
    let eachItem = {
      text: key + "-USD",
      onClick: () =>
        history.push({
          pathname: "/lightchart",
          state: { coinCode: key },
        }),
    };
    itemsList.push(eachItem);
  }

  const handleLogout = () => {};

  return (
    <div>
      <Box className={classes.blockBox}>
        <Box className={classes.blockBox}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title} align="center">
                Crypto Portfolio
              </Typography>
              {isLoggedIn && (
                <Button color="inherit" onClick={handleLogout}>
                  Log Out
                </Button>
              )}
              {!isLoggedIn && (
                <Button color="inherit" onClick={handleLogout}>
                  Log In
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Box className={classes.blockBox}>
          <Box className={classes.inlineBox}>
            <Drawer
              variant="permanent"
              className={classes.drawer}
              classes={{ paper: classes.drawerPaper }}
            >
              <div className={classes.drawerHeader}>
                {/*<IconButton>
                  <MonetizationOnIcon />
                </IconButton>*/}
              </div>
              <Divider />
              <List>
                {itemsList.map((item, index) => {
                  const { text, icon, onClick } = item;
                  return (
                    <ListItem button key={text} onClick={onClick}>
                      <ListItemIcon>
                        <MonetizationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
              <Divider />
              <ListItem
                button
                key="addcoin"
                onClick={() => history.push("/addcoin")}
              >
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Add Coin" />
              </ListItem>
              <Divider />
              <ListItem
                button
                key="lightchart"
                onClick={() =>
                  history.push({
                    pathname: "/lightchart",
                    state: { coinCode: "ETH" },
                  })
                }
              >
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Light Chart" />
              </ListItem>
            </Drawer>
          </Box>
          <Box className={classes.content}>
            <Switch>
              <Route exact path={match.url + `chart`} component={CryptoChart}>
                <CryptoChart />
              </Route>
              <Route
                exact
                path={match.url + `lightchart`}
                component={LightChart}
              >
                <LightChart />
              </Route>
              <Route exact path={match.url + `addcoin`} component={AddCoin}>
                <AddCoin />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
