import React, { Component } from 'react';
import BillSlide from './BillSlide';
import UpdateDoc from './UpdateDoc';
import doc from '../../lib/doc-service';

class BillUpdate extends Component {
  state = {
    isLoading: true,
    item: {},
    error: false,
  }

  async componentDidMount() {
    try {
      const { match: { params: { id } } } = this.props;
      const item = await doc.getById(id);
      this.setState({
        item: item.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  render() {
    const { isLoading, item } = this.state;
    const client = isLoading === false && item.data ? item.data.client : null;
    const items = isLoading === false && item.data ? item.data.items : null;
    const status = isLoading === false && item ? item.status : null;

    return (
      <>
        {
          // eslint-disable-next-line no-nested-ternary
          isLoading === false
            ? (
              status === 'draft'
                ? (
                  <>
                    <UpdateDoc bill={item} />
                    <BillSlide
                      bill={item}
                      client={client}
                      items={items}
                    />
                  </>
                )
                : (
                  <div>
                    <h2>
                      Client
                    </h2>
                    <p>{client.name}</p>
                    <p>{client.name}</p>
                    <h2>
                      Items
                    </h2>
                    <p>{client.name}</p>
                    <h2>Items</h2>
                    <table>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Units</th>
                          <th>Price Units</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => {
                          const { item: itemName, units, priceUnit } = item;
                          return (
                            <tr key={index}>
                              <td>{itemName}</td>
                              <td>{units}</td>
                              <td>{priceUnit}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )
            )
            : <span />
        }
      </>
    );
  }
}

export default BillUpdate;
