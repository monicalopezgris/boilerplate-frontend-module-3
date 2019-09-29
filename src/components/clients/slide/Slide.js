import React, { Component } from 'react';
import styled from 'styled-components';
import { helper } from '../../../lib/helpers';
import InfoPart from './InfoPart';
import BillsPart from './BillsPart';
import ErrorBoundary from '../../../lib/ErrorBoundary';

class Slide extends Component {
  render() {
    const {
      data: {
        name,
        cif,
        street,
        postalCode,
        streetNum,
        country,
      },
    } = this.props;
    return (
      <>
        <InfoPart data={{ name, cif, street, streetNum, postalCode, country }} />
        <BillsPart />
      </>
    );
  }
}

export default ErrorBoundary(Slide);
