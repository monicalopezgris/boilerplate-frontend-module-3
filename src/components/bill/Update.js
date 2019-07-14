import React, { Component } from 'react';
import styled from 'styled-components';
import Slide from './slide/Slide';
import Form from './Form';
import Loading from '../Loading';
import { helper } from '../../lib/helpers';
import doc from '../../lib/doc-service';
import auth from '../../lib/auth-service';
import client from '../../lib/client-service';
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
      isLoading: true,
      status: undefined,
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
    const { data: { client: clientInfo, items }, status, ref } = data;
    this.setStateClient(clientInfo);
    this.setStateItems(items);
    const user = await auth.meData();
    const { clients } = user.data;
    this.setState({
      isLoading: false,
      clients,
      status,
      ref,
    });
  }

  setStateItems = (items) => {
    this.setState({
      items,
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
    } else if (name === 'selectedClient') {
      const { isClient } = this.state;
      if (isClient) {
        client.getById(value)
          .then(({ data }) => {
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
    const { isLoading, status } = this.state;
    if (!isLoading) {
      return (
        <Wrapper>
          {status == "draft"
            ? (
              <FormWrapper>
                <Form
                  state={this.state}
                  onInputChange={this.onInputChange}
                  onSubmit={this.onSubmit}
                  onAddObject={this.onAddObject}
                  onDeleteObject={this.onDeleteObject}
                  onIsClient={this.onIsClient}
                />
              </FormWrapper>
            )
            : <span />}
          <SlideWrapper>
            <Slide bill={this.state} />
          </SlideWrapper>
        </Wrapper>
      );
    }
    return <Loading />;
  }
}

export default Update;
