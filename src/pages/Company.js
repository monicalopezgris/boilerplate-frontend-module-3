import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { string, number, object, array } from 'yup';
import companyService from '../lib/company-service';
// import BillSlideClient from '../components/bill/BillSlideClient';
// import BillSlideItems from '../components/bill/BillSlideItems';
// import UpdateDoc from '../components/form/UpdateDoc';
import NewCompany from '../components/company/NewCompany';
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
      console.log(this.props);
      try {
        const item = await companyService.getById(id);
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
            ? <NewCompany companySchema={{ billSchema: 'aa' }} />
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
