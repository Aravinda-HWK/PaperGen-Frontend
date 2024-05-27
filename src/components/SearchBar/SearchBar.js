import { useState } from 'react';

const SearchBar = ({ callback }) => {
  const [innerValue, setInnerValue] = useState('');

  const container = {
    marginLeft: '76px',
    width: '200px',
    marginBottom: '10px', 
    borderRadius: 10,
    border: 'none',
  };

  const searchBar = {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    border: 'none',
    background: '#e6f5fc',
    boxShadow: '0px 2px 2px #d1dfe6',
  };

  const searchBarInput = {
    height: '30px',
    width: '300px',
    fontSize: '16px',
    border: 'none',
    background: '#e6f5fc',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(innerValue);
  };

  return (
    <form className="searchBar" style={container} onSubmit={handleSubmit}>
      <div style={searchBar}>
        <input
          type="text"
          className="searchBarInput"
          style={searchBarInput}
          value={innerValue}
          onChange={(e) => setInnerValue(e.target.value)}
          placeholder="Find book"
        />
        {/* You can add a clear button here if needed */}
        {/* <div style={searchBarClear}>Clear</div> */}
      </div>
    </form>
  );
};

export default SearchBar;
