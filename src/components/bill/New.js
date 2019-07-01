/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import styled from 'styled-components';
import Slide from './slide/Slide';
import { helper } from '../../lib/helpers';
import Form from './Form';
import doc from '../../lib/doc-service';
import auth from '../../lib/auth-service';
import client from '../../lib/client-service';

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

// eslint-disable-next-line react/prefer-stateless-function
class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClient: false,
      clients: [],
      ref: undefined,
      selectedClient: undefined,
      name: undefined,
      cif: undefined,
      street: undefined,
      streetNum: undefined,
      postalCode: undefined,
      country: undefined,
      items: [],
    };
  }

  async componentDidMount() {
    const user = await auth.meData();
    const { clients } = user.data;
    this.setState({
      clients,
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
    } = data.data;
    this.setState({
      name,
      cif,
      street,
      postalCode,
      streetNum,
      country,
    });
  }

  onIsClient = () => {
    const { isClient } = this.state;
    if (isClient) {
      this.setState({
        selectedClient: undefined,
      });
    }
  }

  onAddObject = () => {
    this.setState(prevState => ({
      items: [...prevState.items, { item: '', units: 0, priceUnit: 0 }],
    }));
  }

  onDeleteObject = (event) => {
    const { items } = this.state;
    const { dataset } = event.target;
    items.splice(dataset.id, 1);
    this.setState({
      items,
    });
  }

  onInputChange = (event) => {
    const { name, dataset } = event.target;
    const { value } = event.target;
    if (dataset.id) {
      const items = [...this.state.items];
      items[dataset.id][name] = value;
      this.setState({ items });
    } else if (name == 'selectedClient') {
      const { isClient } = this.state;
      if (isClient) {
        client.getById(value)
          .then((data) => {
            this.setStateClient(data);
          });
      }
    } else {
      const { target } = event;
      const targetValue = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: targetValue,
      });
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { history } = this.props;
      let values = this.state;
      values = await helper.getRef(values);
      const result = await doc.add(values);
      const { _id: id } = result;
      history.push(`/bill/${id}`);
    } catch (error) {
      this.setState({
        error: 'Ops.... Get in touch with the admin to solve the error',
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <FormWrapper>
          <Form
            state={this.state}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            onAddObject={this.onAddObject}
            onDeleteObject={this.onDeleteObject}
            onIsClient={this.onIsClient}
            onClientSelect={this.onClientSelect}
          />
        </FormWrapper>
        <SlideWrapper>
          <Slide bill={this.state} />
        </SlideWrapper>

      </Wrapper>

    );
  }
}

export default New;
