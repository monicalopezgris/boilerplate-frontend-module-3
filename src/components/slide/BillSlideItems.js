import React from 'react';
import { withDoc } from '../../lib/DocProvider';

const BillSlideItems = ({ state }) => {
  const data = state.current ? state.current : null;
  if (data && data.items) {
    const { items } = data;
    return (items.map((item) => {
      const { item: itemName, units, priceUnits } = item;
      return (
        <div>
          <span>{itemName} | </span>
          <span>{units} | </span>
          <span>{priceUnits}</span>
        </div>
      )})
    );
  }
  return <div />;
};

export default withDoc(BillSlideItems);
