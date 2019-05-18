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
`;

class ClientList extends Component {
  state = {
    clients: [],
  }

  async componentDidMount() {
    console.log('aa')
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
        <Link to="/client/new"><button type="button">Add</button></Link>
        {
          clients.map((client) => {
            console.log(client);
            const { _id: id, name } = client;
            return <ClientListItem key={id} itemData={{ id, name }} onDelete={this.onDelete} />;
          })
        }
      </Wrapper>
    );
  }
}

export default withAuth(ClientList);
