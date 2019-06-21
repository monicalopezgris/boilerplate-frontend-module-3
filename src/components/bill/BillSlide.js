import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import styled from 'styled-components';
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
    const { bill: { data: { client, items }, _id: id, ref } } = this.props;
    this.calcItemTotalPrice(items);
    this.calcSubtotal(items);
    this.calcTaxes(items);
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
            <BillSlideClient data={client} />
            <BillSlideItems data={items} />
          </Bill>
        </PDFExport>
        <Button type="button" onClick={this.exportPDF}>V</Button>
      </>
    );
  }
}

export default BillSlide;
