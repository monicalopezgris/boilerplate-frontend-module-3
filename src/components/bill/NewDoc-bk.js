import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Formik, Field, FieldArray, Form, ErrorMessage, option,
} from 'formik';
import { withRouter } from 'react-router-dom';
import ids from 'short-id';
import { billSchema } from '../../lib/validationSchemas';
import doc from '../../lib/doc-service';
import auth from '../../lib/auth-service';
import ErrorPage from '../../pages/Error';

const Wrapper = styled.div`
  height:100vh;
  overflow: scroll;
`;
const StyledForm = styled(Form)`
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
const ItemsWrapper = styled.div`
  width:100%;
`;
const StyledField = styled(Field)`
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
    clients: [],
  }

  async componentDidMount() {
    const user = await auth.meData();
    const { clients } = user.data;
    this.setState({
      clients,
    });
  }

  getRef = async (values) => {
    const initial = 'bill_';
    values.ref = initial.concat(ids.generate());
    return (values);
  }

  handleSubmit = async (values) => {
    const { history } = this.props;
    try {
      const value = await this.getRef(values);
      const result = await doc.add(value);
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
    const { error, clients, savedClient } = this.state;
    if (!error) {
      return (
        <Wrapper>
          <Formik
            initialValues={{ savedClient: true, status: String, items: [] }}
            validationSchema={billSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              this.handleSubmit(values);
            }}
            render={({ values }) => (
              <StyledForm>
                <Field type="hidden" name="ref" />
                <Heading> Client </Heading>
                <Label> Saved client?</Label>
                <Field type="checkbox" name="savedClient" checked={values.savedClient} onChange={this.handleChange} />
                {savedClient
                  ? (
                    <Field component="select" name="status">
                      {
                        clients.map(client => <option key={client} value={client}>client1</option>)
                      }
                    </Field>
                  )
                  : (
                    <>
                      <Label>Name</Label>
                      <StyledField
                        type="text"
                        name="name"
                        placeholder="name"
                      />
                      <Label>Cif</Label>
                      <ErrorMessage name="name" />
                      <StyledField
                        type="text"
                        name="cif"
                        placeholder="cif"
                      />
                      <ErrorMessage name="cif" />
                      <Label>Street</Label>
                      <StyledField
                        type="text"
                        name="street"
                        placeholder="street"
                      />
                      <ErrorMessage name="street" />
                      <Label>Number</Label>
                      <StyledField
                        type="number"
                        name="streetNum"
                        placeholder="Number"
                      />
                      <ErrorMessage name="streetNum" />
                      <Label>PostalCode</Label>
                      <StyledField
                        type="number"
                        name="postalCode"
                        placeholder="Postal Code"
                      />
                      <ErrorMessage name="postalCode" />
                      <Label>Country</Label>
                      <StyledField
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
                    <ItemsWrapper>
                      <Label>Items</Label>
                      {values.items.map((item, index) => (
                        <div key={index}>
                          <Label>Item</Label>
                          <StyledField name={`items[${index}].item`} placeholder="item" />
                          <Label>Units</Label>
                          <StyledField type="number" name={`items[${index}].units`} placeholder="units" />
                          <Label>Price Unit</Label>
                          <StyledField type="number" name={`items[${index}].priceUnit`} placeholder="priceUnit" />
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
                    </ItemsWrapper>
                  )}
                />
                <Field component="select" name="status">
                  <option value="draft">Draft</option>
                  <option value="Closed">Closed</option>
                </Field>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </StyledForm>
            )
            }
          />
        </Wrapper>
      );
    }
    return <ErrorPage />;
  }
}

export default withRouter(NewDocForm);
