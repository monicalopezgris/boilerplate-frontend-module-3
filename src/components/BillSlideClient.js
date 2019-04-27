import React, { Component } from 'react';
import { withDoc } from '../lib/DocProvider';

class BillSlideClient extends Component {
  state = {  }


  render() { 
    const data = this.props.state.current? this.props.state.current.current : null;
    return ( 
      <div style={{  
        border: '1px solid red',     
        borderRadius: 1 }}>

        <p>Name:{data? data.name:''}</p>
        <p>Ref:{data? data.ref:''}</p>
        <p>Street:{data? data.street:''}</p>
        <p>Postal Code:{data? data.postalCode:''}</p>
        <p>Country: {data? data.country:''}</p>

      </div>
     );
  }
}
 
export default withDoc(BillSlideClient);