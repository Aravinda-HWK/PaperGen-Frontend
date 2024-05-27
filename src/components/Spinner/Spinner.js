import React from 'react';
import ReactLoading from 'react-loading'; // Import the loading spinner library

const LoadingSpinner=()=>{
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
      <ReactLoading type="spin" color="#000000" height={50} width={75} />
    </div>
  );
}

export default LoadingSpinner;
