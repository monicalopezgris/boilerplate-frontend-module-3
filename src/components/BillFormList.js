import React, { Component } from 'react';
import { Formik, Field, Form , FieldArray } from 'formik';
import { withDoc } from '../lib/DocProvider';

class BillFormList extends Component {
  state = {}
  render() {
    const {current}= this.props.state
    const data = current? current.current : {};
    return (
      <Formik
      initialValues={
        data?{data}:''
      }
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        let update= false
        if (data) {
          update=true
        }
        this.handleSubmit(values, update)
      }}
      render={({ values }) => (
        <Form>
          <Field type="text" name="name" placeholder= {`${values.data.name}`} />
          <Field type="text" name="nif" placeholder= {`${values.data.nif}`} />
          <Field type="text" name="street" placeholder= {`${values.data.street}`} />
          <Field type="number" name="streetNum" placeholder= {`${values.data.streetNum}`} />
          <Field type="number" name="postalCode" placeholder= {`${values.data.postalCode}`} />
          <Field type="text" name="country" placeholder= {`${values.data.country}`} />

          <FieldArray
            name="items"
            render={arrayHelpers => (
              <div>
                {values.data ? (
                  values.data.items.map((item, index) => (
                    <div key={index}>
                      <Field name={`${item._id}.item`} placeholder={item.item} />
                      <Field name={`${item._id}.units`} placeholder={item.units} />
                      <Field name={`${item._id}.priceUnit`} placeholder={item.priceUnit} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    {/* show this when user has removed all friends from the list */}
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
    )
    
  }
}

export default withDoc(BillFormList)