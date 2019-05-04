import React, { Component } from 'react';
import BillListItem from './BillListItem';
import { withAuth } from '../lib/AuthProvider';
import doc from '../lib/doc-service';

class BillList extends Component {

  state = {
    bills: [],
  }

  async componentDidMount() {
    const bills = await doc.get();
    this.setState({ bills });
  }

  render() {
    const { bills } = this.state;
    return (bills.map((bill) => {
      const { _id: id } = bill;
      return <BillListItem key={id} itemData={bill} />;
    })
    );
  }
}

export default withAuth(BillList);
