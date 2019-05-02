import React, { Component } from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';
import { withDoc } from '../lib/DocProvider';
import BillFormList from './BillFormList';

class BillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillUnmount() {
    this.props.state.current = {};
  }

  handleInputChange = (e) => {
    const { onChange } = this.props;
    onChange(e);
  }

  handleSubmit = (values, update) => {
    const {name, nif, street, number, postalCode, country} = values
    let aux = []
    for (let i = 0; i < values.item.length; i++) {
      aux.push(
      {"item":values.item[i],
       "units":values.units[i],
       "priceUnits":values.priceUnit[i],
      }
      )
    }

    const finalValues = {
      name, 
      nif, 
      street,
      number, 
      postalCode, 
      country,
      items:aux
    }

    const { onSubmit } = this.props;
    onSubmit(finalValues, update);
  }

  calcPrice = (units, price) => {
    return units * price;
  }

  handleAdd = (values) => {
    const newArr = this.state.items
    newArr.push(values)
    this.setState({
      items: newArr,
    })
  }


  render() {
    const { current } = this.props.state
    const data = current ? current.current : {};
    return (
      <>
        <Formik
      initialValues={
        data ? data : ''
      }
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        let update = false
        if (data) {
          update = true
        }
        this.handleSubmit(values, update)
      }}
      render={({ values }) => (
        <Form>
          <Field type="text" name="name" placeholder={`${values && values.name!= undefined ? values.name : 'name'}`} />
          <Field type="text" name="nif" placeholder={`${values && values.nif!= undefined  ? values.nif : 'nif'}`} />
          <Field type="text" name="street" placeholder={`${values && values.street!= undefined  ? values.street : 'street'}`} />
          <Field type="number" name="streetNum" placeholder={`${values && values.streetNum!= undefined  ? values.streetNum : 'Number'}`} />
          <Field type="number" name="postalCode" placeholder={`${values && values.postalCode!= undefined  ? values.postalCode : 'Postal Code'}`} />
          <Field type="text" name="country" placeholder={`${values && values.country!= undefined  ? values.country : 'Country'}`} />

          <FieldArray
            name="items"
            render={arrayHelpers => (
              <div>
                {values.items && values.items.length > 0 ? (
                  values.items.map((item, index) => (
                    <div key={index}>
                      {/* <Field name={} /> */}
                      <span>Item</span>
                      <Field name={`item.${index}`} placeholder={item.item} />
                      <span>Units</span>
                      <Field type='number' name={`units.${index}`} placeholder={item.units} />
                      <span>Price Unit</span>
                      <Field type='number' name={`priceUnit.${index}`} placeholder={item.priceUnit} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')}
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={(index) => arrayHelpers.insert(index, '')}>
                    Add an item
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />
      </>
    );
  }
}

export default withDoc(BillForm);
