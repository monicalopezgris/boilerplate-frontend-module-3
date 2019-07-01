import React, { Component } from 'react';
import styled from 'styled-components';
import BillSlide from './BillSlide';
import NewDoc from './form/New';
import Loading from '../Loading';
import { helper } from '../../lib/helpers';
import doc from '../../lib/doc-service';
import auth from '../../lib/auth-service';
import client from '../../lib/client-service';
import ErrorPage from '../../pages/Error';

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

class BillUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClient: true,
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
      error: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { id } = await this.props.match.params;
    const bill = await doc.getById(id);
    const { data } = bill;
    const { data: savedClient } = await client.getByCif(data.data.client.cif);
    if (savedClient.length <= 0) {
      this.setState({
        isClient: false,
      });
    }
    this.setStateClient(data);
    const user = await auth.meData();
    const { clients } = user.data;
    this.setState({
      isLoading: false,
      clients,
    });

  }

  async componentDidUpdate(prevProps, prevState) {
    const { selectedClient, isClient } = this.state;
    const { selectedClient: prevSelectedClient } = prevState;
    if (isClient && prevSelectedClient != selectedClient) {
      const data = await client.getById(selectedClient);
      await this.setStateClient(data);
    }
  }

  setStateClient = (data) => {
    const {
      status,
      ref,
      client: {
        name,
        cif,
        address: {
          street,
          postalCode,
          streetNum,
          country,
        },
      },
      items,
    } = data.data;
    this.setState({
      ref,
      name,
      cif,
      street,
      postalCode,
      streetNum,
      country,
      status,
      items,
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
    if (dataset.id) {
      const { value } = event.target;
      const items = [...this.state.items]
      items[dataset.id][name] = value;
      this.setState({ items });
    } else {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value,
      });
    }
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
      this.setState({
        error: 'Ops.... Get in touch with the admin to solve the error',
      });
    }
  }

  render() {
    const { isLoading, item, error } = this.state;
    if (!error) {
      if (!isLoading) {
        return (
          <Wrapper>
            <Form>
              <NewDoc
                state={this.state}
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
                onAddObject={this.onAddObject}
                onDeleteObject={this.onDeleteObject}
                onIsClient={this.onIsClient}
              />
            </Form>
            <Slide>
              <BillSlide bill={this.state} />
            </Slide>
          </Wrapper>
        );
      }
      return <Loading />;
    }
    return <ErrorPage />;
  }
}

export default BillUpdate;
