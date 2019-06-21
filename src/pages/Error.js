import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`

  font-size:1.3rem;
  color: black;

`;


const ErrorPage = ({ error }) => (
  <Wrapper>
    <p>Error {error ? error : '404'}</p>
    <p>Something is wrong, please contact with the administrator</p>
  </Wrapper>
);
export default ErrorPage;
