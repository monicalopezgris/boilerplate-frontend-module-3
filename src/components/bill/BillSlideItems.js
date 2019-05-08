import React from 'react';

const BillSlideItems = ({ data }) => {
  const items = data || null;

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
      </>
    );


  }
  return <div />;
};

export default BillSlideItems;
