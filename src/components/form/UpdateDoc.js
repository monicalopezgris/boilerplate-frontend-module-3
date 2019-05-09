import React, { Component } from 'react';
import {
  Formik, Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import { withRouter } from 'react-router-dom';
import doc from '../../lib/doc-service';

class UpdateDoc extends Component {

  handleSubmit = (values) => {
    const { id } = values;
    const { history } = this.props;
    doc.update(id, values)
      .then((data) => {
      })
      .catch((error) => {
        throw new Error(error);
      });
    history.push('/');
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
      billSchema,
    } = this.props;

    return (
      <>
        <Formik
          className="form"
          initialValues={
            { id, ref, items, name, nif, street, streetNum, postalCode, country }
          }
          validationSchema={billSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            const update = !!id;
            this.handleSubmit(values, update);
          }}
          render={({ values, touched, errors }) => (
            <Form>
              <Field type="hidden" name="id" />
              <Field
                type="text"
                name="name"
                placeholder={`${values && values.name !== undefined ? values.name : 'name'}`}
              />
              <ErrorMessage name="name" />
              <Field
                type="text"
                name="nif"
                placeholder={`${values && values.nif !== undefined ? values.nif : 'nif'}`}
              />
              <ErrorMessage name="nif" />
              <Field
                type="text"
                name="street"
                placeholder={`${values && values.street !== undefined ? values.street : 'street'}`}
              />
              <ErrorMessage name="street" />
              <Field
                type="number"
                name="streetNum"
                placeholder={`${values && values.streetNum !== undefined ? values.streetNum : 'Number'}`}
              />
              <ErrorMessage name="streetNum" />
              <Field
                type="number"
                name="postalCode"
                placeholder={`${values && values.postalCode !== undefined ? values.postalCode : 'Postal Code'}`}
              />
              <ErrorMessage name="postalCode" />
              <Field
                type="text"
                name="country"
                placeholder={`${values && values.country !== undefined ? values.country : 'Country'}`}
              />
              <ErrorMessage name="country" />

              <FieldArray
                name="items"
                render={arrayHelpers => (
                  <div>
                    {values.items && values.items.length > 0 ? (
                      values.items.map((item, index) => (
                        <div key={index}>
                          <span>Item</span>
                          <Field name={`items[${index}].item`} placeholder={item.item} value={item.item} />
                          <span>Units</span>
                          <Field type="number" name={`items[${index}].units`} placeholder={item.units} value={item.units} />
                          <span>Price Unit</span>
                          <Field type="number" name={`items[${index}].priceUnit`} placeholder={item.priceUnit} value={item.priceUnit} />
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

export default withRouter(UpdateDoc);
