import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import styled from 'styled-components';
import { helper } from '../../../lib/helpers';
import ClientPart from './ClientPart';
import ItemsPart from './ItemsPart';
import InfoPart from './InfoPart';

const Bill = styled.div`
padding:2rem;
`;

const Button = styled.button`
 border:none;
 background-color:${props => props.theme.color.primaryColor};
 height:3rem;
 width:3rem;
 border-radius:50%;
 color:white;
 font-weight: bold;
`;

class Slide extends Component {

  exportPDF = () => {
    this.bill.save();
  };

  render() {
    const {
      bill: {
        ref,
        name,
        cif,
        street,
        postalCode,
        streetNum,
        country,
        items,
      },
    } = this.props;
    if (items.length > 0) {
      helper.calcItemTotalPrice(items);
      helper.calcSubtotal(items, helper.getSum(items.total));
      helper.calcTaxes(items);
    };

    return (
      <>
        <PDFExport
          paperSize="A4"
          fileName="bill.pdf"
          eslint-disable-next-line
          no-return-assign
          ref={r => this.bill = r}
        >
          <Bill>
            <InfoPart data={ref} />
            <ClientPart data={{ name, cif, street, streetNum, postalCode, country }} />
            <ItemsPart data={items} />
          </Bill>
        </PDFExport>
        <Button type="button" onClick={this.exportPDF}>PDF</Button>
      </>
    );
  }
}

export default Slide;
