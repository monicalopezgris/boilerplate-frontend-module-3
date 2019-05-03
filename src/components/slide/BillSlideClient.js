import React, { Component } from 'react';
import { withDoc } from '../../lib/DocProvider';

class BillSlideClient extends Component {
  state = {  }


  render() { 
    const data = this.props.state.current? this.props.state.current.current : null;
    return ( 
      <div>

        <p>{data? data.name:''}</p>
        <p>{data? data.nif:''}</p>
        <p>{data? data.street:''},{data? data.streetNum:''}</p>
        <p>{data? data.postalCode:''}</p>
        <p>{data? data.country:''}</p>

      </div>
     );
  }
}
 
export default withDoc(BillSlideClient);