import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import styled from 'styled-components';
import BillSlideClient from './BillSlideClient';
import BillSlideItems from './BillSlideItems';

const PDF = styled(PDFExport)`
  height: 100%;
  background-color: ${props => props.theme.color.secondaryColor};
`;

class BillSlide extends Component {
  state = {}

  exportPDF = () => {
    this.bill.save();
  };

  render() {
    const { client, items } = this.props;
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
          <div>
            <BillSlideClient data={client} />
            <BillSlideItems data={items} />
          </div>
        </PDF>
      </>
    );
  }
}

export default BillSlide;

