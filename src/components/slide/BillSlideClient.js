import React from 'react';
import { withDoc } from '../../lib/DocProvider';


const BillSlideClient = ({ state }) => {
  const data = state.current ? state.current : null;
  const {
    name, nif, street, streetNum, postalCode, country,
  } = data;
  return (
    <div>

      <p>{data ? name : ''}</p>
      <p>{data ? nif : ''}</p>
      <p>
        {data ? street : ''}
        ,
        {data ? streetNum : ''}
      </p>
      <p>{data ? postalCode : ''}</p>
      <p>{data ? country : ''}</p>

    </div>
  );
};

export default withDoc(BillSlideClient);
