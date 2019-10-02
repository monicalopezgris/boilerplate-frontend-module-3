import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import clientService from '../../lib/client-service';
import Loading from '../Loading';
import Slide from './slide/Slide';
import Form from './Form';

const Wrapper = styled.div`
  display: flex;
  width:100%;
`;
const FormWrapper = styled.div`
  flex:1;
  padding: 2%;
`;
const SlideWrapper = styled.div`
  flex:3;
`;

class NewClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  onInputChange = (event) => {
    const { target, target: { name } } = event;
    const targetValue = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: targetValue,
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { history } = this.props;
      const values = this.state;
      clientService.add(values);
      history.push('/');
    } catch (error) {
      throw new Error("Whoops!");
    }
  }

  render() {
    const { isLoading } = this.state;
    if (!isLoading) {
      return (
        <Wrapper>
          <FormWrapper>
            <p>Edit client</p>
            <Form
              state={this.state}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
          </FormWrapper>

          <SlideWrapper>
            <Slide data={this.state} />
          </SlideWrapper>
        </Wrapper>
      );
    }
    return <Loading />;
  }
}

export default withRouter(NewClientForm);
