import React, { Component } from 'react';
import styled from 'styled-components';
import BillSlide from './BillSlide';
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

class BillNew extends Component {
  state = {
    data: false,
  }

  render() {
    const { data } = this.state;
    return (
      <Wrapper>
        <Form>
          <NewDoc />
        </Form>
        <Slide>
          {
            data
              ? <BillSlide />
              : <div>Waiting</div>
          }
        </Slide>

      </Wrapper>

    );
  }
}

export default BillNew;
