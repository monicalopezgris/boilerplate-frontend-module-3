import React, { Component } from 'react';
import {
  Formik, Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import { withRouter } from 'react-router-dom';
import doc from '../../lib/doc-service';

class NewDocForm extends Component {
  state = {}

  handleSubmit = (values) => {
    const { history } = this.props;
    doc.add(values);
    history.push('/');
  }

  render() {
    const { billSchema } = this.props;
    return (
      <>
        <Formik
          className="form"
          initialValues={{ items: [] }}
          validationSchema={billSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            this.handleSubmit(values);
          }}
          render={({ values, touched, errors }) => (
            <Form>
              <Field type="hidden" name="id" />
              <Field
                type="text"
                name="name"
                placeholder="name"
              />
              <ErrorMessage name="name" />
              <Field
                type="text"
                name="nif"
                placeholder="nif"
              />
              <ErrorMessage name="nif" />
              <Field
                type="text"
                name="street"
                placeholder="street"
              />
              <ErrorMessage name="street" />
              <Field
                type="number"
                name="streetNum"
                placeholder="Number"
              />
              <ErrorMessage name="streetNum" />
              <Field
                type="number"
                name="postalCode"
                placeholder="Postal Code"
              />
              <ErrorMessage name="postalCode" />
              <Field
                type="text"
                name="country"
                placeholder="Country"
              />
              <ErrorMessage name="country" />

              <FieldArray
                name="items"
                render={arrayHelpers => (
                  <div>
                    {values.items.map((item, index) => (
                      <div key={index}>
                        <span>Item</span>
                        <Field name={`items[${index}].item`} placeholder='item' />
                        <span>Units</span>
                        <Field type="number" name={`items[${index}].units`} placeholder='units' />
                        <span>Price Unit</span>
                        <Field type="number" name={`items[${index}].priceUnit`} placeholder='priceUnit' />
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
                    }
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

export default withRouter(NewDocForm);
