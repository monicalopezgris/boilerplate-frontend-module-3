import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';
import clientService from '../../lib/client-service';
import ClientListItem from './ClientListItem';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${props => props.theme.color.secondaryColor};
  display:flex;
  flex-direction: column;
  flex:1;
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

class ClientList extends Component {
  state = {
    clients: [],
  }

  async componentDidMount() {
    const clients = await clientService.get();
    this.setState({ clients: clients.data });
  }

  onDelete = (id) => {
    clientService.delete(id);
  }

  render() {
    const { clients } = this.state;
    return (
      <Wrapper>
        <Header>
          <Span>Client name</Span>
        </Header>
        {
          clients.map((client) => {
            const { _id: id, name } = client;
            return <ClientListItem key={id} itemData={{ id, name }} onDelete={this.onDelete} />;
          })
        }
        <LinkButton to="/client/new"><Button type="button">+</Button></LinkButton>
      </Wrapper>
    );
  }
}

export default withAuth(ClientList);
