import React, { Component } from 'react';
import BillSlideClient from '../components/BillSlideClient';
import BillSlideItems from '../components/BillSlideItems'

class BillSlide extends Component {
  state = {  }
  render() {
    return ( 
      <div>
        <h2>Client</h2>
        <BillSlideClient/>
        <h2>Items</h2>
        <BillSlideItems/>
      </div>
     );
  }
}
 

export default BillSlide;