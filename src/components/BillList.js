import React, { Component } from 'react';
import BillListItem from './BillListItem';
import styled from 'styled-components';
import { withAuth } from '../lib/AuthProvider';
import doc from '../lib/doc-service';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${props => props.theme.color.secondaryColor};
`;

class BillList extends Component {
  state = {
    bills: [],
  }

  async componentDidMount() {
    const bills = await doc.get();
    this.setState({ bills: bills.data });
  }

  onDelete = (id) => {
    doc.delete(id);
  }

  render() {
    const { bills } = this.state;
    return (
      <Wrapper>
        <Link to="/new"><button type="button">Add</button></Link>
        {
          bills.map((bill) => {
            const { _id: id } = bill;
            return <BillListItem key={id} itemData={bill} onDelete={this.onDelete} />;
          })
        }
      </Wrapper>
    );
  }
}

export default withAuth(BillList);
