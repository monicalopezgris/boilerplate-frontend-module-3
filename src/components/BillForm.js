import React, { Component } from 'react';

class BillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleInputChange = (e) => {
    const {onChange} = this.props;
    onChange(e)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit} = this.props;
    onSubmit()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="hidden" name="ref" value="" />
        <input type="hidden" name="type" value="" />
        <input type="hidden" name="status" value="" />
        <p>Client Data</p>
        <input type="text" name="cName" value ={this.state.cName} placeholder="Name" onChange={this.handleInputChange} />
        <input type="text" name="cNif" placeholder="Nif" onChange={this.handleInputChange} />
        <p>Address</p>
        <input type="text" name="street" placeholder="Street" onChange={this.handleInputChange} />
        <input type="number" name="streetNum" placeholder="Num" onChange={this.handleInputChange} />
        <input type="number" name="postalCode" placeholder="Postal Code" onChange={this.handleInputChange} />
        <input type="text" name="country" placeholder="Country" onChange={this.handleInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default BillForm;
