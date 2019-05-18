import React from 'react';


const BillSlideClient = ({ data }) => {
  const { name, nif, address: { street, streetNum, postalCode, country } } = data;
  return (
    <div className="client">
      <div>
        <h3>Facturar a:</h3>
        <p>{name}</p>
        <p>{nif}</p>
        <p>{street}, {streetNum}</p>
        <p>{postalCode}, {country}</p>
      </div>
      <div>
        <h3>Enviar a:</h3>
        <p>{name}</p>
        <p>{nif}</p>
        <p>{street}, {streetNum}</p>
        <p>{postalCode}, {country}</p>
      </div>
    </div>
  );
};

export default BillSlideClient;
