// styles.js

export const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const textBoxStyle = {
  position: 'relative',
  cursor: 'pointer',
};

export const popupBoxStyle = {
  position: 'absolute',
  top: '-70px', // Adjust this value to control the distance above the text box
  backgroundColor: 'white',
  border: '1px solid #ccc',
  padding: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  display: 'none',
  zIndex: 1,
};
