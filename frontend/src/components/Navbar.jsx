import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img
          src="https://smsami.com/images/brandLogo.png"
          alt="SMSAMI Logo"
          className="navbar-logo"
        />
      </Link>
      {/* Uncomment below if you plan to use the search */}
      {/* <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Go</button>
      </form> */}
    </div>
  );
};

export default Navbar;
