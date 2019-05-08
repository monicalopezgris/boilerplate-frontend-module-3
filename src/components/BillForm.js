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
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  handleSubmit = (values, update) => {
    const { id, name, nif, street, number, postalCode, country } = values
    const { history } = this.props;
    if (update) {
      doc.update(id, values)
        .then((data) => {
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      // add

      // generate item object using returned data of formik
      let aux = [];
      for (let i = 0; i < values.item.length; i++) {
        aux.push(
          {
            item: values.item[i],
            units: values.units[i],
            priceUnit: values.priceUnit[i],
          },
        );
      }

      const finalValues = {
        id,
        name,
        nif,
        street,
        number,
        postalCode,
        country,
        items: aux,
      };
      this.add(finalValues);
    }
    history.push('/');
  }

  render() {
    // const {
    //   bill: {
    //     _id: id,
    //     ref,
    //     data: {
    //       items, client: {
    //         name, nif, address: {
    //           street, streetNum, postalCode, country,
    //         },
    //       },
    //     },
    //   },
    // } = this.props;
    const bill = this.props.bill ? this.props.bill : null;
    const id = bill ? bill._id : '';
    const ref = bill ? bill.ref : '';
    const name = bill.data ? bill.data.client.name : '';
    const nif = bill.data ? bill.data.client.nif : '';
    const street = bill.data ? bill.data.client.address.street : '';
    const streetNum = bill.data ? bill.data.client.address.streetNum : '';
    const postalCode = bill.data ? bill.data.client.address.postalCode : '';
    const country = bill.data ? bill.data.client.address.country : '';
    const items = bill && bill.data ? bill.data.items : [];
    return (
      <>
        <Formik
          className="form"
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
                          <Field name={`item.${index}`} placeholder={item.item} value={item.item} />
                          <span>Units</span>
                          <Field type="number" name={`units.${index}`} placeholder={item.units} value={item.units} />
                          <span>Price Unit</span>
                          <Field type="number" name={`priceUnit.${index}`} placeholder={item.priceUnit} value={item.units} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {' '}
                            -
                            {' '}
                          </button>
                        </div>
                      ))
                    ) : <div />}
                    <button type="button" onClick={index => arrayHelpers.push('')}>
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
