import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
        <Link to ='/bill'><button type="button">Add</button></Link>
      </>
    );
  }
}

export default withAuth(Dash);
