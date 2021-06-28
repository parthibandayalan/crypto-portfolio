import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Registration from "./pages/Registration";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Snackbar from "./components/CustomizedSnackBar";
import IdleTimerDialog from "./components/IdleTimerDialog";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  timerClass: {
    zIndex: 10,
    postion: "absolute",
  },
}));

function App() {
  const classes = useStyles();
  const API_URL = process.env.REACT_APP_API_URL;
  console.log(API_URL);
  return (
    <div className="App">
      <Snackbar />
      <IdleTimerDialog />
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/error" component={ErrorPage} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
