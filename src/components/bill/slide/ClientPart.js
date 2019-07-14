import React from 'react';
import styled from 'styled-components';
import ErrorBoundary from '../../../lib/ErrorBoundary';

const Clients = styled.div`
  margin-top:3rem;
  display:flex;
`;
const Client = styled.div`
  flex:1;
`;
const Header = styled.h3`
  font-weight:bold;
  text-transform: uppercase;
  color:${props => props.theme.color.primaryColor};
`;

const BillSlideClient = ({ data }) => {
  const { name, cif, street, streetNum, postalCode, country } = data;
  return (
    <Clients className="client">
      <Client>
        <Header>Facturar a:</Header>
        <p>{name}</p>
        <p>{cif}</p>
        <p>{street}, {streetNum}</p>
        <p>{postalCode}, {country}</p>
      </Client>
      <Client>
        <Header>Enviar a:</Header>
        <p>{name}</p>
        <p>{street}, {streetNum}</p>
        <p>{postalCode}, {country}</p>
      </Client>
    </Clients>
  );
};

export default ErrorBoundary(BillSlideClient);
