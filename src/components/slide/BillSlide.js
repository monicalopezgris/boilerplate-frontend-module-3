import React, { Component } from 'react';
import BillSlideClient from './BillSlideClient';
import BillSlideItems from './BillSlideItems'

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