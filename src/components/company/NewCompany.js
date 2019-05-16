import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Formik, Field, Form, ErrorMessage
} from 'formik';
import { withRouter } from 'react-router-dom';
import companyService from '../../lib/company-service';

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
const Item = styled.div`
  border-bottom: 1px solid grey;
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

class NewClientForm extends Component {

  handleSubmit = (values) => {
    const { history } = this.props;
    companyService.add(values);
    history.push('/');
  }

  render() {
    const { billSchema } = this.props;
    return (
      <>
        <Formik
          initialValues={{ admin: '5cc3c4867066592eaf736b52', status: String, items: [] }}
          // validationSchema={billSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            this.handleSubmit(values);
          }}
          render={({ values }) => (
            <Formu>
              <Field type="hidden" name="id" />
              <Field type="hidden" name="admin" />
              <Heading> Client </Heading>
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
              <Label>Contact</Label>
              <Fieldu
                type="email"
                name="contact"
                placeholder="contact"
              />
              <ErrorMessage name="street" />
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
              <div>
                <button type="submit">Submit</button>
              </div>
            </Formu>
          )}
        />
      </>
    );
  }
}

export default withRouter(NewClientForm);
