import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Registration from "./pages/Registration";
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
          <Route exact path="/register" component={Registration} />
          <Route exact path="/error" component={ErrorPage} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
