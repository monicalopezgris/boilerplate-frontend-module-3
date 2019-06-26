import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import styled from 'styled-components';
import { helper } from '../../lib/helpers';
import BillSlideClient from './BillSlideClient';
import BillSlideItems from './BillSlideItems';
import BillSlideInfo from './BillSlideInfo';

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

class BillSlide extends Component {

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
        objects: items,
      },
    } = this.props;
    console.log('props', this.props)

    if (items) {
      helper.calcItemTotalPrice(items);
      // helper.calcSubtotal(items, helper.getSum(items.total));
      // helper.calcTaxes(items);
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
            <BillSlideInfo data={ref} />
            <BillSlideClient data={{ name, cif, street, streetNum, postalCode, country }} />
            <BillSlideItems data={items} />
          </Bill>
        </PDFExport>
        <Button type="button" onClick={this.exportPDF}>PDF</Button>
      </>
    );
  }
}

export default BillSlide;
