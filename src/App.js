import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Private from "./pages/Private";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dash from './pages/Dash';
import Bill from './pages/Bill';

import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";
import DocProvider from "./lib/DocProvider"

class App extends Component {
  state={
    aa:[]
  }
  render() {
    return (
      <AuthProvider>
        <DocProvider>
        <div className="container">
        <h1>Billy</h1>
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/dash" component={Dash} />
            <PrivateRoute path="/bill" component={Bill} />
            <PrivateRoute path="/private" component={Private} />
          </Switch>
        </div>
        </DocProvider>
      </AuthProvider>
    );
  }
}

export default App;
