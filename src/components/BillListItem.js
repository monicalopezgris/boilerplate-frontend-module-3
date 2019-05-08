/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class BillListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDelete(id) {
    const { onDelete } = this.props;
    onDelete(id);
  }

  render() {
    const {
      itemData: {
        _id: id, createdAt, updatedAt,
      },
    } = this.props;
    return (
      <div>
        <button type="button" onClick={() => { this.handleDelete(id); }}> Delete </button>
        <Link to={`/${id}`}>
          <span>{id}</span>
          <span> | {createdAt}</span>
          <span> | {updatedAt}</span>
        </Link>
      </div>
    );
  }
}

export default withRouter(BillListItem);
