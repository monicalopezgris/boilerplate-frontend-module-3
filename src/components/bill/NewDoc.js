/* eslint-disable indent */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import ids from 'short-id';
import { withRouter } from 'react-router-dom';
import doc from '../../lib/doc-service';
import auth from '../../lib/auth-service';

class NewDocForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClient: true,
      clients: [],
      ref: undefined,
      selectedClient: undefined,
      name: undefined,
      cif: undefined,
      street: undefined,
      streetNum: undefined,
      postalCode: undefined,
      country: undefined,
      objects: [],
    };
  }

  async componentDidMount() {
    const user = await auth.meData();
    const { clients } = user.data;
    this.setState({
      clients,
    });
  }

  handleIsClient = () => {
    const { isClient } = this.state;
    if (isClient) {
      this.setState({
        selectedClient: undefined,
      });
    }
  }

  handleAddObject = () => {
    this.setState(prevState => ({
      objects: [...prevState.objects, { item: '', units: 1, priceUnit: 0 }],
    }));
  }

  handleDeleteObject = (event) => {
    const { objects } = this.state;
    const { dataset } = event.target;
    objects.splice(dataset.id, 1);
    this.setState({
      objects,
    });
  }

  handleInputChange = (event) => {
    const { className, name } = event.target;
    if (['item', 'units', 'priceUnits'].includes(className)) {
      const { value, dataset } = event.target;
      const objects = [...this.state.objects]
      objects[dataset.id][name] = value;
      this.setState({ objects });
    } else {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value,
      });
    }
  }

  getRef = async (values) => {
    const initial = 'bill_';
    values.ref = initial.concat(ids.generate());
    return (values);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    let values = this.state;
    try {
      values = await this.getRef(values);
      const result = await doc.add(values);
      const { _id: id } = result;
      history.push(`/bill/${id}`);
    } catch (error) {
      this.setState({
        error: 'Ops.... Get in touch with the admin to solve the error',
      });
    }
  }

  render() {
    const {
      ref, name, cif, street, postalCode, streetNum, country, isClient, clients, selectedClient, objects,
    } = this.state;

    return (
      <form
        onChange={this.handleInputChange}
        onSubmit={this.handleSubmit}
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
            onClick={this.handleIsClient}
            onChange={this.handleInputChange}
          />
        </label>

        {isClient ? (
          <select name="selectedClient" value={selectedClient} onChange={this.handleInputChange}>
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
              <input
                name="name"
                type="text"
              />
              <br />
              <label htmlFor={cif}>
                Cif:
              </label>
              <input
                name="cif"
                type="text"
              />
              <br />
              <label htmlFor={street}>
                Street:
              </label>
              <input
                name="street"
                type="text"
              />
              <br />
              <label htmlFor={streetNum}>
                Street Number:
              </label>
              <input
                name="streetNum"
                type="number"
              />
              <br />
              <label htmlFor={postalCode}>
                Postal Code:
              </label>
              <input
                name="postalCode"
                type="number"
              />
              <br />
              <label htmlFor={country}>
                Country:
              </label>
              <input
                name="country"
                type="text"
              />
            </>
          )}
        {objects.length >= 0 ? (
          objects.map((val, index) => {
            const itemIndex = `item-${index}`;
            const unitsIndex = `units-${index}`;
            const priceUnitIndex = `priceUnits-${index}`;
            return (
              <div key={index}>
                <button
                  type="button"
                  data-id={index}
                  onClick={this.handleDeleteObject}>Delete</button>
                <label htmlFor={itemIndex}>
                  Item
                </label>
                <input
                  type="text"
                  name="item"
                  data-id={index}
                  id={itemIndex}
                  value={objects[index].item}
                  className="item"
                />
                <br />
                <label htmlFor={unitsIndex}>
                  Units
                </label>
                <input
                  type="number"
                  defaultValue={1}
                  name="units"
                  data-id={index}
                  id={unitsIndex}
                  value={objects[index].units}
                  className="units"
                />
                <br />
                <label htmlFor={priceUnitIndex}>
                  Price / Unit
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  name="priceUnit"
                  data-id={index}
                  id={priceUnitIndex}
                  value={objects[index].priceUnits}
                  className="priceUnits"
                />
              </div>
            );
          })
        ) : (
            <div />
          )}
        <button type="button" onClick={this.handleAddObject}> Add item</button>
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default withRouter(NewDocForm);
