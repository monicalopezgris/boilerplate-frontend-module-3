import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withAuth } from '../../lib/AuthProvider';
import doc from '../../lib/doc-service';
import ListItem from './ListItem';
import ErrorBoundary from '../../lib/ErrorBoundary';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${props => props.theme.color.secondaryColor};
`;

const Header = styled.div`
  flex:1;
  text-decoration: none;
  display:flex;
  justify-content: space-around;
  font-family:${props => props.theme.font};
  color:white;
  padding:1rem 0;
  font-weight:bold;
  text-transform: uppercase;
  background-color:${props => props.theme.color.primaryColor};
`;
const Span = styled.span`
  flex:1;
  padding: 0 1rem;
`;
const LinkButton = styled(Link)`
  display:flex;
  justify-content:center;
`;
const Button = styled.button`
 border:none;
 background-color:${props => props.theme.color.primaryColor};
 height:2rem;
 width:2rem;
 border-radius:50%;
 color:white;
 font-weight: bold;
`;

class BillList extends Component {
  state = {
    bills: [],
  }

  componentDidMount() {
    this.getBills();
  }

  getBills = async () => {
    try {
      const bills = await doc.get();
      this.setState({ bills: bills.data });
    } catch (e) {
      throw new Error('¡Whooops!');
    }
  }

  onDelete = (id) => {
    doc.delete(id);
    this.getBills();
  }

  render() {
    const { bills } = this.state;
    return (
      <Wrapper>
        <Header>
          <Span>ref</Span>
          <Span>name</Span>
          <Span>status</Span>
          <Span> Last update </Span>
        </Header>
        {
          bills.map((bill) => {
            const { _id: id } = bill;
            return <ListItem key={id} itemData={bill} onDelete={this.onDelete} />;
          })
        }
        <LinkButton to="/bill/new"><Button type="button">+</Button></LinkButton>
      </Wrapper>
    );
  }
}

export default ErrorBoundary(withAuth(BillList));
