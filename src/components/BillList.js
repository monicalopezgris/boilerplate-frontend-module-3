import React, { Component } from 'react';
import BillListItem from './BillListItem';
import { withAuth } from '../lib/AuthProvider';
import { withDoc } from '../lib/DocProvider'


class BillList extends Component {
  render() {
    const { bills } = this.props;
    return (bills.map(bill => <BillListItem key={bill._id} itemData={bill} />)
    );
  }
}

export default withAuth(withDoc(BillList));
