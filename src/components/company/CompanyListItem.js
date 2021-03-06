/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const WrapperAsLink = styled(Link)`
  text-decoration: none;
  border-bottom:1px solid  rgb(155, 155, 155);
  display:flex;
  justify-content: space-around;
  font-family:${props => props.theme.font};
  color:black;
  padding:1rem 0;
`;
const CardSm = styled.div`
  display: flex;
  flex-direction:column;
`;
const Button = styled.button`
  background-color: transparent;
  border:none;
`;

class ClientListItem extends Component {
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
        id,
        name,
      },
    } = this.props;
    return (
      <WrapperAsLink to={`/client/${id}`}>
        <CardSm>
          <span>{name}</span>
        </CardSm>
        <Button type="button" onClick={() => { this.handleDelete(id); }}> X </Button>
      </WrapperAsLink>
    );
  }
}

export default withRouter(ClientListItem);
