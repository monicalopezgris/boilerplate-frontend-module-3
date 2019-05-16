import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { string, number, object, array } from 'yup';
import clientService from '../lib/client-service';
// import BillSlideClient from '../components/bill/BillSlideClient';
// import BillSlideItems from '../components/bill/BillSlideItems';
// import UpdateDoc from '../components/form/UpdateDoc';
import NewClient from '../components/clients/NewClient';
// import { billSchema } from '../lib/validationSchemas';

class Client extends Component {
  state = {
    isLoading: true,
    item: {},
    state: 'new',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id !== 'new') {
      try {
        const item = await clientService.getById(id);
        this.setState({
          item: item.data,
          isLoading: false,
          state: 'update',
        });
      } catch (error) {
        console.log(error);
      }
    } else if (id === 'new') {
      this.setState({
        isLoading: false,
      });
    }
  }

  exportPDF = () => {
    this.bill.save();
  }

  render() {
    const { isLoading, item, state } = this.state;

    const { name, cif } = item;

    return (
      <>
        {/* {
          isLoading === false && state === 'update'
            ? <UpdateDoc billSchema={billSchema} bill={item} />
            : <span />
        } */}
        {
          isLoading === false && state === 'new'
            ? <NewClient clientSchema={{ billSchema: 'aa' }} />
            : <span />
        }

        <button type="button" onClick={this.exportPDF}>download</button>

        <div>
          <p>{name}</p>
          <p>{cif}</p>
        </div>
      </>
    );
  }
}

export default Client;
