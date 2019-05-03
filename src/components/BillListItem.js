import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withDoc } from '../lib/DocProvider';

class BillListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(id) {
    this.props.delete(id);
  }

  handleCurrent(data) {
    const { storeCurrent } = this.props;
    storeCurrent(data);

    setTimeout(() => {
      const { history } = this.props;
      history.push('/bill');
    }, 500);
  }

  render() {
    const {
      itemData, itemData: {
        _id: id, createdAt, updatedAt,
      },
    } = this.props;
    return (
      <div>
        <button type="button" onClick={() => { this.handleClick(id); }}> Delete </button>
        <div onClick={() => { this.handleCurrent(itemData); }}>
          <span>{id}</span>
          <span> | {createdAt}</span>
          <span> | {updatedAt}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(withDoc(BillListItem));
