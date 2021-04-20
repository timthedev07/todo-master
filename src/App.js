import { Component } from "react";
import { Heading } from "./components/Heading";
import { NotFound } from "./components/404";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";

import "./css/master.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Heading alignment="center" />
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <Heading alignment="left" />
            <Dashboard />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
