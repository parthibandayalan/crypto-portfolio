import React, { Component } from "react";
import Chart from "./Chart";
import { withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  "chart-container": {
    height: 400,
    width: 900,
  },
});

class CryptoChart extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      pairing: this.props.location.state.coinCode + "-USD",
      lineChartData: {
        labels: [],
        datasets: [
          {
            type: "line",
            label: this.props.location.state.coinCode + "-USD",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: this.props.theme.palette.primary.main,
            pointBackgroundColor: this.props.theme.palette.secondary.main,
            pointBorderColor: this.props.theme.palette.secondary.main,
            borderWidth: "2",
            lineTension: 0.45,
            data: [],
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
          ],
        },
      },
    };
  }*/

  state = {
    pairing: this.props.location.state.coinCode + "-USD",
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: this.props.location.state.coinCode + "-USD",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: this.props.theme.palette.primary.main,
          pointBackgroundColor: this.props.theme.palette.secondary.main,
          pointBorderColor: this.props.theme.palette.secondary.main,
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
      ],
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
        ],
      },
    },
  };

  componentDidMount() {
    console.log("Rerender happend");
    this.ws = new WebSocket("wss://ws-feed.pro.coinbase.com");
    //this.createGDXSocket(this.props.location.state.coinCode);

    const oldBtcDataSet = this.state.lineChartData.datasets[0];
    const newBtcDataSet = { ...oldBtcDataSet };
    newBtcDataSet.label = this.props.location.state.coinCode + "-USD";
    const newChartData = {
      ...this.state.lineChartData,
      datasets: [newBtcDataSet],
    };
    console.log(
      "Inside Mounting Function : " +
        this.props.location.state.coinCode +
        "-USD"
    );

    this.setState({
      pairing: this.props.location.state.coinCode + "-USD",
      lineChartData: newChartData,
    });

    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: [this.state.pairing],
        },
      ],
    };

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
      console.log(" subscribe send : " + JSON.stringify(subscribe));
    };

    //below code is replaced by a call to sendmessage function
    /*this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
      console.log(" subscribe send : " + JSON.stringify(subscribe));
    };*/

    this.ws.onmessage = (e) => {
      const value = JSON.parse(e.data);
      if (value.type !== "ticker" || value.product_id !== this.state.pairing) {
        return;
      }
      console.log("value : " + JSON.stringify(value));
      const oldBtcDataSet = this.state.lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(value.price);
      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newBtcDataSet],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        ),
      };
      this.setState({ lineChartData: newChartData });
    };
  }

  /*sendMessage = (msg) => {
    // Wait until the state of the socket is not ready and send the message when it is...
    waitForSocketConnection(function () {
      this.ws.send(JSON.stringify(msg));
      console.log(" subscribe send : " + JSON.stringify(msg));
    });
  };

  // Make the function wait until the connection is made...
  waitForSocketConnection = (callback) => {
    setTimeout(function () {
      if (this.ws.readyState === 1) {
        console.log("Connection is made");
        if (callback != null) {
          callback();
        }
      } else {
        console.log("wait for connection...");
        waitForSocketConnection(callback);
      }
    }, 5); // wait 5 milisecond for the connection...
  };*/

  createGDXSocket(coinCode) {
    const oldBtcDataSet = this.state.lineChartData.datasets[0];
    const newBtcDataSet = { ...oldBtcDataSet };
    newBtcDataSet.data = [];
    newBtcDataSet.label = this.props.location.state.coinCode + "-USD";
    const newChartData = {
      ...this.state.lineChartData,
      datasets: [newBtcDataSet],
      labels: [],
    };
    console.log(
      "Inside GDX Socket Function : " +
        this.props.location.state.coinCode +
        "-USD"
    );
    console.log("Check 1");
    this.setState({ pairing: this.props.location.state.coinCode + "-USD" });
    this.setState({ lineChartData: newChartData });
    console.log("Check 2");
    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: [this.props.location.state.coinCode + "-USD"],
        },
      ],
    };

    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(subscribe));
      console.log(" subscribe send : " + JSON.stringify(subscribe));
    }

    //below code is replaced by a call to sendmessage function
    /*this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
      console.log(" subscribe send : " + JSON.stringify(subscribe));
    };

    this.ws.onmessage = (e) => {
      const value = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }

      const oldBtcDataSet = this.state.lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(value.price);
      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newBtcDataSet],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        ),
      };
      this.setState({ lineChartData: newChartData });
    };*/
  }

  componentDidUpdate(prevProps) {
    let newPairing = this.props.location.state.coinCode + "-USD";
    let prevPairing = prevProps.location.state.coinCode + "-USD";
    if (newPairing.localeCompare(prevPairing) != 0) {
      //this.forceUpdate();
      console.log("New State : " + newPairing);
      console.log("Previous State : " + prevPairing);
      console.log("Component updates");
      this.createGDXSocket(this.props.location.state.coinCode);
      //this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes["chart-container"]}>
        <Chart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
      </Card>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true })
)(CryptoChart);
