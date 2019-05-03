import React, { Component } from 'react';
import {withDoc} from '../../lib/DocProvider';

class BillSlideItems extends Component {
  state = {  }
  render() { 
    const data = this.props.state.current? this.props.state.current.current : null;
    if (data && data.items) {
      const {items} = data;
      return (items.map(item => {
        return(
         <>
         <div>
           <span>{item.item} | </span>
           <span>{item.units} | </span>
           <span>{item.priceUnits}</span>
         </div>
         </>
        )})
       );
    }
    return <div></div>
    
  }
}
 
export default withDoc(BillSlideItems);