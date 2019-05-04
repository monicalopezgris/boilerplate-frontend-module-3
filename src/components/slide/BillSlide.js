import React from 'react';
import BillSlideClient from './BillSlideClient';
import BillSlideItems from './BillSlideItems';

const BillSlide = () => (
  <div>
    <h2>Client</h2>
    <BillSlideClient />
    <h2>Items</h2>
    <BillSlideItems />
  </div>
);
export default BillSlide;
