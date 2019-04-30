import React, { Component } from 'react';
import BillFormItem from './BillFormItem';

class BillFormList extends Component {
  state = {}
  render() {
    const { items } = this.props;
    if (items) {
      return (items.map((item, index) => {
        return <BillFormItem key={index} item={item} />
      }));
    } else {
      return<BillFormItem/>
    }
    
    
  }
}

export default BillFormList