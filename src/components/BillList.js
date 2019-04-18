import React, { Component } from 'react';
import docService from '../lib/doc-service';
import BillListItem from './BillListItem';
import { withAuth } from '../lib/AuthProvider';


class BillList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
    };
  }

  async componentDidMount() {
    const bills = await docService.get();
    this.setState({ bills });
  }

  onDelete(id){
    docService.del(id);
  }

  render() {
    const { bills } = this.state;
    return (
      bills.map((data, index) => <BillListItem key={index} data={data} onDelete={this.onDelete} />)
    );
  }
}

export default withAuth(BillList);
