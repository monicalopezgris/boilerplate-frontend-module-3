import React from 'react';


const BillSlideClient = ({ data }) => {
  const name = data ? data.name : '';
  const nif = data ? data.nif : '';
  return (
    <div className="client">
      <h2>Client</h2>
      <p>{name}</p>
      <p>{nif}</p>
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
