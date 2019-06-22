import React, { Component } from 'react';
import styled from 'styled-components';
// import BillSlide from './BillSlide';
import NewDoc from './form/New';

const Wrapper = styled.div`
  display: flex;
  border:1px solid yellow;
  width:100%;
`;
const Form = styled.div`
  flex:1;
  border:1px solid purple;
  padding: 2%;
`;
const Slide = styled.div`
  flex:3;
  border:1px solid green;
`;

// eslint-disable-next-line react/prefer-stateless-function
class BillNew extends Component {
  render() {
    return (
      <Wrapper>
        <Form>
          <NewDoc />
        </Form>
        <Slide />

      </Wrapper>

    );
  }
}

export default BillNew;
