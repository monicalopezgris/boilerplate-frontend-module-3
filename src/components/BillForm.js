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
    let {items} = values;
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

    console.log(finalValues)
    const { onSubmit } = this.props;
    onSubmit(values, update);
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
          <Field type="text" name="name" placeholder={`${values ? values.name : ''}`} />
          <Field type="text" name="nif" placeholder={`${values ? values.nif : ''}`} />
          <Field type="text" name="street" placeholder={`${values ? values.street : ''}`} />
          <Field type="number" name="streetNum" placeholder={`${values ? values.streetNum : ''}`} />
          <Field type="number" name="postalCode" placeholder={`${values ? values.postalCode : ''}`} />
          <Field type="text" name="country" placeholder={`${values ? values.country : ''}`} />

          <FieldArray
            name="items"
            render={arrayHelpers => (
              <div>
                {values.items && values.items.length > 0 ? (
                  values.items.map((item, index) => (
                    <div key={index}>
                      {/* <Field name={} /> */}
                      <Field name={`item.${index}`} placeholder={item.item} />
                      <Field name={`units.${index}`} placeholder={item.units} />
                      <Field name={`priceUnit.${index}`} placeholder={item.priceUnit} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')}
                        // onClick={() => arrayHelpers.push(
                        //   {"item":values.item[index],
                        //    "units":values.units[index],
                        //    "priceUnits":values.priceUnit[index],
                        //   }
                        //   )} 
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
