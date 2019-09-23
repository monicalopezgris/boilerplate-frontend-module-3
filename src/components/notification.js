import React from 'react';
import styled from 'styled-components';

const Notification = () => {
  const notification = styled.div`
  max-width: 100%;
  font-size:1.2;
  color:red;
`;

  return (
    <notification>
      message
    </notification>
  );
}

export default Notification;