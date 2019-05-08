/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dash from './pages/Dash';
import Bill from './pages/Bill';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './lib/AuthProvider';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <h1>Billy</h1>
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute exact path="/:id" component={Bill} />
            <PrivateRoute path="/new" component={Bill} />
            <PrivateRoute path="/" component={Dash} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
