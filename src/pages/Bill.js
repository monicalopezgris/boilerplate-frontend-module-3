import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BillForm from '../components/BillForm';
import BillSlide from '../components/BillSlide';
import { withDoc } from '../lib/DocProvider';
import { PDFExport } from '@progress/kendo-react-pdf';


class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  
  exportPDF = () => {
    this.bill.save();
  }

  render() {
    return (
      <>
        <Link to='/dash'><button type="button">Dash</button></Link>
        <BillForm />
        <PDFExport paperSize={'Letter'}
          fileName="bill.pdf"
          ref={(r) => this.bill = r}>
          <BillSlide />
        </PDFExport>
        
        <button onClick={this.exportPDF}>download</button>
      </>
    );
  }
}

export default withDoc(Bill);
