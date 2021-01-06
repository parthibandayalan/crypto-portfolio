import "./App.css";
import CryptoChart from "./components/CryptoChart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Snackbar from "./components/CustomizedSnackBar";

function App() {
  return (
    <div className="App">
      <Snackbar />
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/error" component={ErrorPage} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
