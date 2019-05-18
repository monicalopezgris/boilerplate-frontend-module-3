import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import doc from '../lib/doc-service';
import UpdateDoc from '../components/bill/UpdateDoc';
import NewDoc from '../components/bill/NewDoc';
import BillSlide from '../components/bill/BillSlide';

import { billSchema } from '../lib/validationSchemas';

class Bill extends Component {
  state = {
    isLoading: true,
    item: {},
    state: 'new',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id !== 'new') {
      try {
        const item = await doc.getById(id);
        this.setState({
          item: item.data,
          isLoading: false,
          state: 'update',
        });
      } catch (error) {
        console.log(error);
      }
    } else if (id === 'new') {
      this.setState({
        isLoading: false,
      });
    }
  }

  exportPDF = () => {
    this.bill.save();
  }

  render() {
    const { isLoading, item, state } = this.state;
    const client = isLoading === false && item.data ? item.data.client : null;
    const items = isLoading === false && item.data ? item.data.items : null;
    const status = isLoading === false && item ? item.status : null;

    return (
      <>
        {
          isLoading === false && state === 'update' && status === 'draft'
            ? <UpdateDoc billSchema={billSchema} bill={item} />
            : <span />
        }
        {
          isLoading === false && state === 'new'
            ? <NewDoc billSchema={billSchema} />
            : <span />
        }

        <BillSlide client={client} items={items} />
        {/* <button type="button" onClick={this.exportPDF}>download</button>

        <PDFExport
          paperSize="A4"
          fileName="bill.pdf"
          // eslint-disable-next-line no-return-assign
          ref={r => this.bill = r}
        >
          <div className="slide">
            <BillSlideClient data={client} />
            {isLoading === false
              && <BillSlideItems data={items} />
            }
          </div>
        </PDFExport> */}

      </>
    );
  }
}

export default Bill;
