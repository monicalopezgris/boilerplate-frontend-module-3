/* eslint-disable import/prefer-default-export */
import ids from 'short-id';

export const helper = {
  getRef: () => {
    const initial = 'bill_';
    // eslint-disable-next-line no-param-reassign
    const ref = initial.concat(ids.generate());
    return (ref);
  },
  calcTaxes: (items) => {
    const { subtotal } = items;
    items.total = subtotal + (subtotal * 60) / 100;
  },
  getSum: (total, num) => total + num,
  calcSubtotal: (items, getSumResult) => {
    const aux = [];
    items.forEach((item) => {
      aux.push(item.totalPriceItem);
    });
    const totalPrice = aux.reduce((total, num) => total + num);
    items.subtotal = totalPrice;
  },
  calcItemTotalPrice: (items) => {
    items.forEach((item) => {
      const { priceUnit, units } = item;
      item.totalPriceItem = priceUnit * units;
    });
  },

};
