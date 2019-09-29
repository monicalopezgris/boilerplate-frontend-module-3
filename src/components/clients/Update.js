import React, { Component } from 'react';
import styled from 'styled-components';
import Slide from './slide/Slide';
// import Form from './Form';
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
      isClient: true,
      items: [],
      isLoading: true,
      status: undefined,
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

  // onInputChange = (event) => {
  //   const { name, dataset } = event.target;
  //   const { value } = event.target;
  //   if (dataset.id) {
  //     const items = [...this.state.items];
  //     items[dataset.id][name] = value;
  //     this.setState({ items });
  //   } else if (name === 'selectedClient') {
  //     const { isClient } = this.state;
  //     if (isClient) {
  //       client.getById(value)
  //         .then(({ data }) => {
  //           this.setStateClient(data);
  //         });
  //     }
  //   } else {
  //     const { target } = event;
  //     const targetValue = target.type === 'checkbox' ? target.checked : target.value;
  //     this.setState({
  //       [name]: targetValue,
  //     });
  //   }
  // }

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
            <p>Form</p>
            {/* <Form
                  state={this.state}
                  onInputChange={this.onInputChange}
                  onSubmit={this.onSubmit}
                  onAddObject={this.onAddObject}
                  onDeleteObject={this.onDeleteObject}
                  onIsClient={this.onIsClient}
                /> */}
          </FormWrapper>

          <SlideWrapper>
            <p>Slide</p>
            <Slide data={this.state} />
          </SlideWrapper>
        </Wrapper>
      );
    }
    return <Loading />;
  }
}

export default Update;
