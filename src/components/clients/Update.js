import React, { Component } from 'react';
import styled from 'styled-components';
import Slide from './slide/Slide';
import Form from './Form';
import Loading from '../Loading';
import { helper } from '../../lib/helpers';
import doc from '../../lib/doc-service';
import auth from '../../lib/auth-service';
import clients from '../../lib/client-service';
import ErrorPage from '../../pages/Error';

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

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { id } = await this.props.match.params;
    const { data } = await clients.getById(id);
    const {
      name,
      cif,
      contact,
      address: {
        street,
        number,
        postalCode,
        country,
      },
    } = data;
    this.setState({
      name,
      cif,
      contact,
      street,
      number,
      postalCode,
      country,
      isLoading: false,
    });
  }

  setStateClient = (data) => {
    const {
      name,
      cif,
      address: {
        street,
        postalCode,
        streetNum,
        country,
      },
    } = data;
    this.setState({
      name,
      cif,
      street,
      postalCode,
      streetNum,
      country,
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
      const { id: idUrl } = this.props.match.params;
      const values = this.state;
      const result = await doc.update(idUrl, values);
      const { _id: id } = result;
      history.push(`/bill/${id}`);
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

export default Update;
