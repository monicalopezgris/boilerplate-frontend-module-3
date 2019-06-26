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
      objects: [],
      error: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { id } = await this.props.match.params;
    const info = await doc.getById(id);
    const { data } = info;
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
      name,
      cif,
      address: {
        street,
        postalCode,
        streetNum,
        country,
      },
    } = data.data.client;
    if (data.data.items) {
      const { items } = data.data;
      this.setState({
        items,
      });
    }
    const {
      status,
      ref,
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
    });
    console.log('updateState', this.state)
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
      objects: [...prevState.objects, { item: '', units: 0, priceUnit: 0 }],
    }));
  }

  onDeleteObject = (event) => {
    const { objects } = this.state;
    const { dataset } = event.target;
    objects.splice(dataset.id, 1);
    this.setState({
      objects,
    });
  }

  onInputChange = (event) => {
    const { name, dataset } = event.target;
    if (dataset.id) {
      const { value } = event.target;
      const objects = [...this.state.objects]
      objects[dataset.id][name] = value;
      this.setState({ objects });
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
              {/* <div>holi</div> */}
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
