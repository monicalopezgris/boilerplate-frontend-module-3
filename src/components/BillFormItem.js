import React, { Component } from 'react';
import { Formik, Field } from 'formik';

class billFormItem extends Component {
  state = {  }
  render() { 
    const {item} = this.props
    return ( 
      <Formik
      initialValues={item?item:''}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        let update= false;
        // if (data) {
        //   update=true
        // }
        this.handleAdd(values, update)
      }}

      render={(props) => (
        <form onSubmit={props.handleSubmit}>
          <Field type="text" name="item" placeholder="item" />
          <Field type="number" name="units" placeholder="units" />
          <Field type="number" name="priceUnit" placeholder="priceUnit" />
          <button type="submit">Submit</button>
        </form>
      )}
      />
     );
  }
}
 
export default billFormItem;