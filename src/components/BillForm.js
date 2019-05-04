import React, { Component } from 'react';
import {
  Formik, Field, FieldArray, Form,
} from 'formik';
import { withRouter } from 'react-router-dom';
import doc from '../lib/doc-service';

class BillForm extends Component {
  // componentWillUnmount() {
  //   const { bill } = this.props;
  //   delete bill;
  // }

  add = (inputData) => {
    doc.add(inputData)
      .then((data) => {
        console.log('added', data)
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  update = (id, inputData) => {
    console.log(id)
    doc.update(id, inputData)
      .then((data) => {
        console.log('update', data)
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  onSubmit = (values, update) => {
    console.log(values)
    if (update) {
      this.update(values.id, values);
    } else {
      this.add(values);
    }
  }

  handleSubmit = async (values, update) => {
    const { history } = this.props;
    const { id, name, nif, street, number, postalCode, country } = values

    let aux = []
    if (values.item) {
      //generate item object
      for (let i = 0; i < values.item.length; i++) {
        aux.push(
          {
            "item": values.item[i],
            "units": values.units[i],
            "priceUnits": values.priceUnit[i],
          }
        )
      }
    }

    const finalValues = {
      id,
      name,
      nif,
      street,
      number,
      postalCode,
      country,
      items: aux
    }
    await this.onSubmit(finalValues, update);
    await history.push('/');
  }

  render() {
    const {
      bill: {
        _id: id,
        ref,
        data: {
          items, client: {
            name, nif, address: {
              street, streetNum, postalCode, country,
            },
          },
        },
      },
    } = this.props;

    return (
      <>
        <Formik
          initialValues={
            { id, ref, items, name, nif, street, streetNum, postalCode, country }
          }
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            const update = !!id;
            this.handleSubmit(values, update);
          }}
          render={({ values }) => (
            <Form>
              <Field type="hidden" name="id" />
              <Field type="text" name="name" placeholder={`${values && values.name !== undefined ? values.name : 'name'}`} />
              <Field type="text" name="nif" placeholder={`${values && values.nif !== undefined ? values.nif : 'nif'}`} />
              <Field type="text" name="street" placeholder={`${values && values.street !== undefined ? values.street : 'street'}`} />
              <Field type="number" name="streetNum" placeholder={`${values && values.streetNum !== undefined ? values.streetNum : 'Number'}`} />
              <Field type="number" name="postalCode" placeholder={`${values && values.postalCode !== undefined ? values.postalCode : 'Postal Code'}`} />
              <Field type="text" name="country" placeholder={`${values && values.country !== undefined ? values.country : 'Country'}`} />

              <FieldArray
                name="items"
                render={arrayHelpers => (
                  <div>
                    {values.items && values.items.length > 0 ? (
                      values.items.map((item, index) => (
                        <div key={index}>
                          <span>Item</span>
                          <Field name={`item.${index}`} placeholder={item.item} />
                          <span>Units</span>
                          <Field type="number" name={`units.${index}`} placeholder={item.units} />
                          <span>Price Unit</span>
                          <Field type="number" name={`priceUnit.${index}`} placeholder={item.priceUnit} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            {' '}
                            -
                            {' '}

                          </button>
                        </div>
                      ))
                    ) : <div />}
                    <button type="button" onClick={index => arrayHelpers.insert(index, '')}>
                      Add an item
                    </button>
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

export default withRouter(BillForm);
