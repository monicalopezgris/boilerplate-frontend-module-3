import React from 'react';
import styled from 'styled-components';
import ErrorBoundary from '../../../lib/ErrorBoundary';

const Wrapper = styled.div`
  margin-top:3rem;
  display:flex;
  justify-content:space-around;
  `;
const Title = styled.h2`
  margin-top:3rem;
  margin-bottom:2rem;
  font-family: Arial;
  font-size: 2.5rem;
  `;

const BillSlideInfo = ({ data: { name, cif, street, streetNum, postalCode, country } }) => {
  return (
    <Wrapper>
      <div>
        <Title>{name}</Title>
        <p>{cif}</p>
        <p>{street}, {streetNum}</p>
        <p>{postalCode}, {country}</p>
        <p></p>
      </div>
      <img alt="logo" src="/logo.png" />
    </Wrapper>
  );
};

export default ErrorBoundary(BillSlideInfo);
