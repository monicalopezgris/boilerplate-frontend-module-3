import React from 'react';
import styled from 'styled-components';

const LoadingDiv = styled.div`
  width: 100%;
  text-align:center;
  font-size:1.2;
  Color:pink;
  
`;

const Loading = () => (
  <LoadingDiv>
    Loading...
  </LoadingDiv>
);

export default Loading;
