import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import { withDoc } from '../lib/DocProvider';

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
    onChange(e)
  }

  handleSubmit = (values, update) => {
    const {onSubmit} = this.props
    onSubmit(values, update)
  }

  calcPrice = (units, price) => {
    return units * price;
  }

  addItem = (item, units, priceUnit) => {
    const newArr = this.state.items
    newArr.push(
      {
        item,
        units,
        priceUnit,
      }
    )
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

          {/* <Field type="text" name="item" placeholder="item" />
          <Field type="number" name="units" placeholder="units" />
          <Field type="number" name="priceUnit" placeholder="priceUnit" /> */}
          <button type="submit">Submit</button>
        </form>
      )}
    />
        
      </>
    );
  }
}

export default withDoc(BillForm);
