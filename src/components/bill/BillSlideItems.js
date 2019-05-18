import React from 'react';

const BillSlideItems = ({ data }) => {
  const items = data || null;
  const { subtotal, total } = data;

  if (items) {
    return (
      <>
        <div>
          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Units</th>
                <th>Price units</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const { item: itemName, units, priceUnit, totalPriceItem } = item;
                return (
                  <tr key={index}>
                    <td>{itemName}</td>
                    <td>{units}</td>
                    <td>{priceUnit}</td>
                    <td>{totalPriceItem}</td>
                  </tr>
                );
              })}
              <tr>
                <th>Subtotal</th>
                <th>{subtotal}</th>
              </tr>
              <tr>
                <th>Iva</th>
                <th>21%</th>
              </tr>
              <tr>
                <th>Total</th>
                <th>{total}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );


  }
  return <div />;
};

export default BillSlideItems;
