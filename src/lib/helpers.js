/* eslint-disable import/prefer-default-export */
import ids from 'short-id';

export const helper = {
  getRef: (values) => {
    const initial = 'bill_';
    // eslint-disable-next-line no-param-reassign
    values.ref = initial.concat(ids.generate());
    return (values);
  },
};
