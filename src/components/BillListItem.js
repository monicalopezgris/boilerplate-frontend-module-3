import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withDoc } from '../lib/DocProvider';

class BillListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick(id) {
    this.props.delete(id)
  }

  handleCurrent(data) {
    this.props.storeCurrent(data)

    setTimeout(() => {
      this.props.history.push('/bill');
    }, 500);
  }

  render() {
    const { itemData } = this.props;
    const { _id } = itemData;
    return (
      <div>
        <button type="button" onClick={() => { this.handleClick(_id); }}> Delete </button>        
        <div onClick={() => { this.handleCurrent(itemData); }}>
          <span> {itemData.data.client.name} </span>
          <span>| {itemData.data.client.nif}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(withDoc(BillListItem));
