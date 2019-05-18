import React, { Component } from 'react';
// import BillSlide from './BillSlide';
import NewDoc from './NewDoc';


class BillNew extends Component {
  state = {}

  render() {
    // const {  } = this.state;
    // const client = isLoading === false && item.data ? item.data.client : null;
    // const items = isLoading === false && item.data ? item.data.items : null;
    // const status = isLoading === false && item ? item.status : null;
    return (
      <>
        <NewDoc />
        {/* <BillSlide /> */}
      </>
    );
  }
}

export default BillNew;
