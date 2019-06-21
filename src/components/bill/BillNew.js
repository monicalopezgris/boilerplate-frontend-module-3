import React, { Component } from 'react';
import styled from 'styled-components';
// import BillSlide from './BillSlide';
import NewDoc from './NewDoc';

const Wrapper = styled.div`
  display: flex;
`;
const Form = styled.div`
  flex:1;
`;
const Slide = styled.div`
  flex:2;
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
