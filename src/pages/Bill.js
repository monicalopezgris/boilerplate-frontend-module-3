import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PDFExport } from '@progress/kendo-react-pdf';
import doc from '../lib/doc-service';
import BillSlideClient from '../components/bill/BillSlideClient';
import BillSlideItems from '../components/bill/BillSlideItems';
import BillForm from '../components/BillForm';


class Bill extends Component {
  state = {
    isLoading: true,
    item: {},
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id !== 'new') {
      const item = await doc.getById(id);
      this.setState({
        item,
        isLoading: false,
      });
    } else if (id === 'new') {
      this.setState({
        isLoading: false,
      });
    } else {
      console.log('error');
    }
  }

  exportPDF = () => {
    this.bill.save();
  }

  render() {
    const { isLoading } = this.state;
    const { item } = this.state;
    const client = isLoading === false && item.data ? item.data.client : null;
    const items = isLoading === false && item.data ? item.data.items : null;
    return (
      <>
        <Link to='/'><button type="button">Dash</button></Link>
        {
          isLoading === false
          && <BillForm bill={item || null} />
        }
        <button type="button" onClick={this.exportPDF}>download</button>

        <PDFExport
          paperSize='A4'
          fileName="bill.pdf"
          ref={r => this.bill = r}
        >
          <div className="slide">
            <BillSlideClient data={client} />
            {isLoading === false
              && <BillSlideItems data={items} />
            }
          </div>
        </PDFExport>

      </>
    );
  }
}

export default Bill;
