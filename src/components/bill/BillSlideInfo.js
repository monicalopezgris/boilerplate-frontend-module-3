import React from 'react';


const BillSlideInfo = ({ data: id }) => {
  return (
    <div>
      <div>
        <h3>Info</h3>
        <p>Ref: {id}</p>
      </div>
    </div>
  );
};

export default BillSlideInfo;
