/* eslint-disable indent */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from '../../lib/ErrorBoundary';

const FormWrapper = styled.form`
  display:flex;
  flex-direction:column;
`;
const Input = styled.input`
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
`;

// eslint-disable-next-line react/prefer-stateless-function
class Form extends Component {
  render() {
    const {
      onInputChange,
      onSubmit,
      state,
    } = this.props;
    const {
      name, cif, street, postalCode, streetNum, country,
    } = state;

    return (
      <FormWrapper
        onChange={onInputChange}
        onSubmit={onSubmit}
      >
        <>
          <label htmlFor={name}>
            Name:
          </label>
          <Input
            name="name"
            type="text"
            defaultValue={name}
          />
          <br />
          <label htmlFor={cif}>
            Cif:
          </label>
          <Input
            name="cif"
            type="text"
            defaultValue={cif}
          />
          <br />
          <label htmlFor={street}>
            Street:
          </label>
          <Input
            name="street"
            type="text"
            defaultValue={street}
          />
          <br />
          <label htmlFor={streetNum}>
            Street Number:
          </label>
          <Input
            name="streetNum"
            type="number"
            defaultValue={streetNum}
          />
          <br />
          <label htmlFor={postalCode}>
            Postal Code:
          </label>
          <Input
            name="postalCode"
            type="number"
            defaultValue={postalCode}
          />
          <br />
          <label htmlFor={country}>
            Country:
          </label>
          <Input
            name="country"
            type="text"
            defaultValue={country}
          />
        </>
        <button type="submit">Send</button>
      </FormWrapper>
    );
  }
}

export default ErrorBoundary(withRouter(Form));
