import React from 'react';

const BillSlideItems = ({ data: items }) => {
  return (items.map((item, index) => {
    const { item: itemName, units, priceUnits } = item;
    return (
      <div key={index}>
        <span>{itemName} | </span>
        <span>{units} | </span>
        <span>{priceUnits}</span>
      </div>
    )
  })
  );
  return <div />;
};

export default BillSlideItems;
