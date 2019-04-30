import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import { withDoc } from '../lib/DocProvider';
import BillFormList from './BillFormList';

class BillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[]
    };
  }

  componentWillUnmount() {
    this.props.state.current={};
  }

  handleInputChange = (e) => {
    const {onChange} = this.props;
    onChange(e);
  }

  handleSubmit = (values, update) => {
    const {onSubmit} = this.props;
    const {items} = this.state;
    onSubmit(values, items, update);
  }

  calcPrice = (units, price) => {
    return units * price;
  }

  handleAdd = (values) => {
    const newArr = this.state.items
    newArr.push(values)
    this.setState({
      items:newArr,
    })
  }
  
  
  render() {
    const {current}= this.props.state
    const data = current? current.current : {};
    return (
      <>
      <Formik
      initialValues={data}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        let update= false
        if (data) {
          update=true
        }
        this.handleSubmit(values, update)
      }}

      render={(props) => (
        <form onSubmit={props.handleSubmit}>
          <Field type="text" name="name" placeholder="name" />
          <Field type="text" name="nif" placeholder="nif" />
          <Field type="text" name="street" placeholder="street" />
          <Field type="number" name="streetNum" placeholder="streetNum" />
          <Field type="number" name="postalCode" placeholder="postalCode" />
          <Field type="text" name="country" placeholder="country" />
          <button type="submit">Submit</button>
        </form>
      )}
      />
      <BillFormList items={data?data.items:null}/>
      </>
    );
  }
}

export default withDoc(BillForm);
