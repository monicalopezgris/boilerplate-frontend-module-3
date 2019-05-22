import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Formik, Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import { withRouter } from 'react-router-dom';
import { billSchema } from '../../lib/validationSchemas';
import doc from '../../lib/doc-service';

const Wrapper = styled.div`
  height:100vh;
  overflow: scroll;
`;
const Formu = styled(Form)`
  margin: 0;
  width: 100%;
  background-color:${props => props.theme.color.secondaryColor};
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  padding: 0 15% 0 15%;
  color: black;
 
`;
const Item = styled.div`
  border-bottom: 1px solid grey;
`;
const Label = styled.span`
  // text-align: center;
  margin: 5% 0;
`;
const Heading = styled.span`
  font-size:1.3;
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

class UpdateDoc extends Component {

  handleSubmit = (values) => {
    const { id } = values;
    const { onChange } = this.props;
    doc.update(id, values)
      .then((data) => {
        onChange();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  render() {
    // console.log(this.props);
    const {
      bill: {
        _id: id,
        status,
        data: {
          items,
          client: {
            name, cif, address: {
              street, streetNum, postalCode, country,
            },
          },
        },
      },
    } = this.props;

    return (
      <Wrapper>
        <Formik
          className="form"
          initialValues={
            { id, status, items, name, cif, street, streetNum, postalCode, country }
          }
          validationSchema={billSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            const update = !!id;
            this.handleSubmit(values, update);
          }}
          render={({ values }) => (
            <Formu>
              <Field type="hidden" name="id" />
              <Heading> Client </Heading>
              <Label> Name</Label>
              <Fieldu
                type="text"
                name="name"
                placeholder={`${values && values.name !== undefined ? values.name : 'name'}`}
              />
              <ErrorMessage name="name" />
              <Label>Cif</Label>
              <Fieldu
                type="text"
                name="cif"
                placeholder={`${values && values.cif !== undefined ? values.cif : 'cif'}`}
              />
              <ErrorMessage name="cif" />
              <Label>Street</Label>
              <Fieldu
                type="text"
                name="street"
                placeholder={`${values && values.street !== undefined ? values.street : 'street'}`}
              />
              <ErrorMessage name="street" />
              <Label>Number</Label>
              <Fieldu
                type="number"
                name="streetNum"
                placeholder={`${values && values.streetNum !== undefined ? values.streetNum : 'Number'}`}
              />
              <ErrorMessage name="streetNum" />
              <Label>PostalCode</Label>
              <Fieldu
                type="number"
                name="postalCode"
                placeholder={`${values && values.postalCode !== undefined ? values.postalCode : 'Postal Code'}`}
              />
              <ErrorMessage name="postalCode" />
              <Label>Country</Label>
              <Fieldu
                type="text"
                name="country"
                placeholder={`${values && values.country !== undefined ? values.country : 'Country'}`}
              />
              <ErrorMessage name="country" />

              <FieldArray
                name="items"
                render={arrayHelpers => (
                  <div>
                    <Heading> Items </Heading>
                    {values.items && values.items.length > 0 ? (
                      values.items.map((item, index) => (
                        <Item key={index}>
                          <Label>Item</Label>
                          <Fieldu name={`items[${index}].item`} placeholder={item.item} value={item.item} />
                          <ErrorMessage name={`items[${index}].item`} />
                          <Label>Units</Label>
                          <Fieldu type="number" name={`items[${index}].units`} placeholder={item.units} value={item.units} />
                          <ErrorMessage name={`items[${index}].units`} />
                          <Label>Price Unit</Label>
                          <Fieldu type="number" name={`items[${index}].priceUnit`} placeholder={item.priceUnit} value={item.priceUnit} />
                          <ErrorMessage name={`items[${index}].priceUnit`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {' '}
                            -
                            {' '}
                          </button>

                        </Item>
                      ))
                    ) : <div />}
                    <button type="button" onClick={index => arrayHelpers.push('')}>
                      Add an item
                    </button>
                  </div>
                )}
              />
              <Heading>Status</Heading>
              <Field component="select" name="status">
                <option value="draft">Draft</option>
                <option value="sended">Sended</option>
              </Field>
              <div>
                <button type="submit">Submit</button>
              </div>
            </Formu>
          )}
        />
      </Wrapper>
    );
  }
}

export default withRouter(UpdateDoc);
