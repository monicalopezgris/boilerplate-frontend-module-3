import React from 'react';


const BillSlideInfo = ({ data: ref }) => {
  return (
    <div>
      <div>
        <img alt="logo" src="/logo.png" />
        <p>Ref: {ref}</p>
      </div>
    </div >
  );
};

export default BillSlideInfo;
