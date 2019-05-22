import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Formik, Field, FieldArray, Form, ErrorMessage, option,
} from 'formik';
import { withRouter } from 'react-router-dom';
import { billSchema } from '../../lib/validationSchemas';
import ids from 'short-id';
import doc from '../../lib/doc-service';

const Formu = styled(Form)`
  margin: 0;
  width: 100%;
  background-color:${props => props.theme.color.secondaryColor};
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  padding: 0 15% 0 15%;
  color: black;
`;
const Label = styled.span`
  text-align: center;
  margin: 5% 0;
`;
const Heading = styled.span`
  font-size:1.5;
  font-weight:bold;
  text-align: center;
  margin: 5% 0;
`;
const Fieldu = styled(Field)`
  border-radius: 10px;
  border: 2px solid transparent;
  font-size: 1rem;
  text-align: center;
  &: hover{
    border-color: ${props => props.theme.color.primaryColor};
  }
  &: focus{
    border-color: ${props => props.theme.color.primaryColor};
  }
  padding: 3% 5%;
`;

class NewDocForm extends Component {
  state = {
    savedClient: false,
    error: false,
  }

  getRef = async (values) => {
    const initial = 'bill_';
    values.ref = initial.concat(ids.generate());
    return (values);
  }

  handleSubmit = async (values) => {
    const { history } = this.props;
    await this.getRef(values);
    try {
      const result = await doc.add(values);
      const { _id: id } = result;
      history.push(`/bill/${id}`);
    } catch (error) {
      this.setState({
        error: 'Ops.... Get in touch with the admin to solve the error',
      });
    }
  }

  handleChange = () => {
    const { savedClient } = this.state;
    if (savedClient) {
      this.setState({
        savedClient: false,
      });
    } else {
      this.setState({
        savedClient: true,
      });
    }
  }

  render() {
    const { error } = this.state;
    if (!error) {
      return (
        <>
          <Formik
            initialValues={{ savedClient: true, status: String, items: [] }}
            validationSchema={billSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              this.handleSubmit(values);
            }}
            render={({ values }) => (
              <Formu>
                <Field type="hidden" name="ref" />
                <Heading> Client </Heading>
                <Label> Saved client?</Label>
                <Field type="checkbox" name="savedClient" checked={values.savedClient} onChange={this.handleChange} />
                {this.state.savedClient
                  ? (
                    <Field component="select" name="status">
                      <option value={"client1"}>client1</option>
                      <option value={"closed"}>client2</option>
                      <option value={"sended"}>client3</option>
                    </Field>
                  )
                  : (
                    <>
                      <Label> Name</Label>
                      <Fieldu
                        type="text"
                        name="name"
                        placeholder="name"
                      />
                      <Label>Cif</Label>
                      <ErrorMessage name="name" />
                      <Fieldu
                        type="text"
                        name="cif"
                        placeholder="cif"
                      />
                      <ErrorMessage name="cif" />
                      <Label>Street</Label>
                      <Fieldu
                        type="text"
                        name="street"
                        placeholder="street"
                      />
                      <ErrorMessage name="street" />
                      <Label>Number</Label>
                      <Fieldu
                        type="number"
                        name="streetNum"
                        placeholder="Number"
                      />
                      <ErrorMessage name="streetNum" />
                      <Label>PostalCode</Label>
                      <Fieldu
                        type="number"
                        name="postalCode"
                        placeholder="Postal Code"
                      />
                      <ErrorMessage name="postalCode" />
                      <Label>Country</Label>
                      <Fieldu
                        type="text"
                        name="country"
                        placeholder="Country"
                      />
                      <ErrorMessage name="country" />
                    </>
                  )
                }
                <FieldArray
                  name="items"
                  render={arrayHelpers => (
                    <div>
                      {values.items.map((item, index) => (
                        <div key={index}>
                          <Label>Item</Label>
                          <Fieldu name={`items[${index}].item`} placeholder="item" />
                          <Label>Units</Label>
                          <Fieldu type="number" name={`items[${index}].units`} placeholder="units" />
                          <Label>Price Unit</Label>
                          <Fieldu type="number" name={`items[${index}].priceUnit`} placeholder="priceUnit" />
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
                    </div>
                  )}
                />
                <Field component="select" name="status">
                  <option value="draft">Draft</option>
                  <option value="Closed">Closed</option>
                </Field>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </Formu>
            )
            }
          />
        </>
      );
    }
    return <div>{error}</div>;
  }
}

export default withRouter(NewDocForm);