import React, { Component } from 'react';
import BillForm from '../components/BillForm';
import docService from '../lib/doc-service'

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  onChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  onSubmit = () => {
    if(this.state){
      docService.get()
      docService.add(this.state)
    }
  }

  render() {
    return (
      <BillForm onSubmit={this.onSubmit} onChange={this.onChange} />
    );
  }
}

export default Bill;
