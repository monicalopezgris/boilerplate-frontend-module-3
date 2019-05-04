import React from 'react';


const BillSlideClient = ({ data }) => {
  const { name, nif } = data;
  return (
    <div>

      <p>{data ? name : ''}</p>
      <p>{data ? nif : ''}</p>
      {/* <p>
        {data ? street : ''}
        ,
        {data ? streetNum : ''}
      </p>
      <p>{data ? postalCode : ''}</p>
      <p>{data ? country : ''}</p> */}

    </div>
  );
};

export default BillSlideClient;
