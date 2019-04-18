import React, { Component } from 'react';

class BillListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick(id) {
    this.props.onDelete(id);
  }

  render() {
    const { data } = this.props;
    const { _id } = data;
    return (
      <div>
        <button type="button" onClick={() => { this.handleClick(_id); }}> Delete </button>
        <span> {data.ref} </span>
        <span>| {data.type}</span>
        <span>| {data.created_at}</span>
      </div>
    );
  }
}

export default BillListItem;
