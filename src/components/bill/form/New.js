/* eslint-disable indent */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Form = styled.form`
  border: 1px solid red;
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
class NewDocForm extends Component {
  render() {
    const {
      onInputChange,
      onSubmit,
      onAddObject,
      onDeleteObject,
      onIsClient,
      onClientSelect,
      state,
    } = this.props;
    const {
      ref, name, cif, street, postalCode, streetNum, country, isClient, clients, selectedClient, objects,
    } = state;
    console.log(name)

    return (
      <Form
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
        {objects.length >= 0 ? (
          objects.map((val, index) => {
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
                  defaultValue={objects[index].item}
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
                  defaultValue={objects[index].units}
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
                  defaultValue={objects[index].priceUnits}
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
            <div />
          )}
        <button type="button" onClick={onAddObject}> Add item</button>
        <button type="submit">Send</button>
      </Form>
    );
  }
}

export default withRouter(NewDocForm);
