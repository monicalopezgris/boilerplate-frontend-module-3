/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '../../lib/ErrorBoundary';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  border-bottom:1px solid grey;
`;

const WrapperAsLink = styled(Link)`
  flex:1;
  text-decoration: none;
  display:flex;
  justify-content: space-around;
  font-family:${props => props.theme.font};
  color:black;
  padding:1rem 0;
`;
const Span = styled.span`
  flex:1;
`;
const Button = styled.button`
  background-color: transparent;
  border:none;
`;

class ListItem extends Component {
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
        _id: id,
        ref,
        status,
        data: {
          client: {
            name,
          },
        },
      },
    } = this.props;
    return (
      <Wrapper>
        <WrapperAsLink to={`/bill/${id}`}>
          <Span>{ref}</Span>
          <Span>{name}</Span>
          <Span>{status}</Span>
        </WrapperAsLink>
        <Button type="button" onClick={() => { this.handleDelete(id); }}> X </Button>
      </Wrapper>
    );
  }
}

export default ErrorBoundary(withRouter(ListItem));
