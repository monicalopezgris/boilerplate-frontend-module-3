import React, { Component } from 'react';
import { Formik, Field, Form , FieldArray } from 'formik';

class aillFormItem extends Component {
  state = {  }
  render() { 
    const {item} = this.props
    return ( 
      <Formik
          enableReinitialize
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

                    {values.items ? (
                      values.items.map(function (item, index) {
                        item = item==undefined? {item:'', units:'', priceUnit:''}: item;
                        return (
                          <div key={index}>
                            <Field name={`${index}.item`} placeholder={item.item} />
                            <Field name={`${index}.units`} placeholder={item.units} />
                            <Field name={`${index}.priceUnit`} placeholder={item.priceUnit} />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                              -
                            </button>
                            <button
                        type="button"
                        onClick={() => {
                          console.log(values)
                          // arrayHelpers.replace(index, '')
                        }} // insert an empty string at a position
                      >
                        +
                      </button>
                          </div>
                        )
                      })
                      
                      ) : (
                        
                  <div></div>
              )}
                <div>
                <button type="button" onClick={() => arrayHelpers.push({item:'', units: '', priceUnit:''})}>
                {/* show this when user has removed all friends from the list */
                }
                Add an item
                </button>
                <button type="submit">Submit</button>
              </div>
              </div>
          )}
        />
      </Form>
    )
  }
    />
     );
  }
}
 
// export default billFormItem;