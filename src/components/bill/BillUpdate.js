import React, { Component } from 'react';
import styled from 'styled-components';
import BillSlide from './BillSlide';
import UpdateDoc from './UpdateDoc';
import Loading from '../Loading'
import doc from '../../lib/doc-service';

const Wrapper = styled.div`
  display: flex;
`;
const Form = styled.div`
  flex:1;
`;
const Slide = styled.div`
flex:2;
`;

class BillUpdate extends Component {
  state = {
    isLoading: true,
    item: undefined,
    error: false,
  }

  componentDidMount() {
    this.onChange();
  }

  onChange = () => {
    const { match: { params: { id } } } = this.props;
    doc.getById(id)
      .then((item) => {
        const { data } = item;
        this.setState({
          item: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: 'Ops.... Get in touch with the admin to solve the error',
        });
      });
  }

  render() {
    const { isLoading, item, error } = this.state;
    if (!error) {
      if (!isLoading) {
        const { item: { status } } = this.state;
        return (
          <Wrapper>
            {status === 'draft'
              ? (
                <>
                  <Form>
                    <UpdateDoc bill={item} onChange={this.onChange} />
                  </Form>
                  <Slide>
                    <BillSlide bill={item} />
                  </Slide>
                </>
              )
              : (
                <BillSlide bill={item} />
              )
            }
          </Wrapper>
        );
      }
      return <Loading />;
    }
    return <div>{error}</div>;
  }
}

export default BillUpdate;
