/* eslint-disable indent */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const FormWrapper = styled.form`
  display:flex;
  flex-direction:column;
`;
const ObjectsWrapper = styled.div`
  display:flex;
  flex-direction:column;
  padding: 5% 0;
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
      onAddObject,
      onDeleteObject,
      onIsClient,
      state,
    } = this.props;
    const {
      ref, name, cif, street, postalCode, streetNum, country, isClient, clients, selectedClient, items, status,
    } = state;

    return (
      <FormWrapper
        onChange={onInputChange}
        onSubmit={onSubmit}
      >
        <input
          type="hidden"
          value={ref}
        />
        <label>
          Already a client?:
          <input
            name="isClient"
            type="checkbox"
            checked={isClient}
            onClick={onIsClient}
            onChange={onInputChange}
          />
        </label>

        {isClient ? (
          <select name="selectedClient" value={selectedClient} onChange={onInputChange}>
            <option value={null}>Choose a client</option>
            {
              clients.map(
                client => <option key={client._id} value={client._id}>{client.name}</option>,
              )
            }
          </select>
        ) : (
            <>
              <div>Client info</div>
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
          )}
        {items.length >= 0 ? (
          items.map((val, index) => {
            const itemIndex = `item-${index}`;
            const unitsIndex = `units-${index}`;
            const priceUnitIndex = `priceUnits-${index}`;
            return (
              <ObjectsWrapper key={index}>
                <label htmlFor={itemIndex}>
                  Item
                </label>
                <Input
                  type="text"
                  name="item"
                  data-id={index}
                  id={itemIndex}
                  defaultValue={items[index].item}
                />
                <br />
                <label htmlFor={unitsIndex}>
                  Units
                </label>
                <Input
                  type="number"
                  name="units"
                  data-id={index}
                  id={unitsIndex}
                  defaultValue={items[index].units}
                />
                <br />
                <label htmlFor={priceUnitIndex}>
                  Price / Unit
                </label>
                <Input
                  type="number"
                  name="priceUnit"
                  data-id={index}
                  id={priceUnitIndex}
                  defaultValue={items[index].priceUnit}
                />
                <button
                  type="button"
                  data-id={index}
                  onClick={onDeleteObject}
                >
                  Delete
                </button>
              </ObjectsWrapper>

            );
          })
        ) : (
            <span />
          )}
        <button type="button" onClick={onAddObject}> Add item</button>
        <select name="status" value={status} onChange={onInputChange}>
          <option value="draft">Draft</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit">Send</button>
      </FormWrapper>
    );
  }
}

export default withRouter(Form);
