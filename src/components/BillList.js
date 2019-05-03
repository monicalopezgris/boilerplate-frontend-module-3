import React, { Component } from 'react';
import BillListItem from './BillListItem';
import { withAuth } from '../lib/AuthProvider';
import { withDoc } from '../lib/DocProvider'


class BillList extends Component {
  state = {
    bills:[]
  }

  async componentDidMount() {
    const {get} = this.props;
    await get()
  };

  render() {
    const { bills } = this.props;
    return (bills.map(bill => {
      const {_id:id, createdAt, updatedAt} = bill;
     return <BillListItem key={bill._id} itemData={bill} />})
    );
  }
}

export default withAuth(withDoc(BillList));
