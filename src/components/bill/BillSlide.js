import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import styled from 'styled-components';
import BillSlideClient from './BillSlideClient';
import BillSlideItems from './BillSlideItems';
import BillSlideInfo from './BillSlideInfo';

const PDF = styled(PDFExport)`
  // height: 100%;
  // background-color: ${props => props.theme.color.secondaryColor};
`;
const Bill = styled.div`
// margin-left:-100vw;
`;

class BillSlide extends Component {
  state = {}

  exportPDF = () => {
    this.bill.save();
  };

  calcItemTotalPrice = (items) => {
    items.forEach((item) => {
      const { priceUnit, units } = item;
      item.totalPriceItem = priceUnit * units;
    });
  }

  getSum = (total, num) => total + num

  calcSubtotal = (items) => {
    const aux = [];
    items.forEach((item) => {
      aux.push(item.totalPriceItem);
    });
    const totalPrice = aux.reduce(this.getSum);
    items.subtotal = totalPrice;
  }

  calcTaxes = (items) => {
    const { subtotal } = items;
    items.total = subtotal + (subtotal * 60) / 100;
  }

  render() {
    const { bill: { data: { client, items }, _id: id } } = this.props;
    this.calcItemTotalPrice(items);
    this.calcSubtotal(items);
    this.calcTaxes(items);

    return (
      <>
        <button type="button" onClick={this.exportPDF}>download</button>
        <PDF
          paperSize="A4"
          fileName="bill.pdf"
          eslint-disable-next-line
          no-return-assign
          ref={r => this.bill = r}
        >
          <Bill>
            <BillSlideInfo data={id} />
            <BillSlideClient data={client} />
            <BillSlideItems data={items} />
          </Bill>
        </PDF>
      </>
    );
  }
}

export default BillSlide;
