import React, { Component } from 'react';
// import { Route, Switch } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';
import BillList from '../components/BillList';
// import BillAddForm from '../components/BillAddForm';

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <>
        <BillList />
        <button type="button">Add</button>
      </>
    );
  }
}

export default withAuth(Dash);
