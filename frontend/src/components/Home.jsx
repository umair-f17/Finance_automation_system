import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="page-layout">
      <h1 >POS Finanace Dashboard</h1>
      {/* <p >
        Our platform offers cutting-edge tools to streamline your operations, enhance productivity, and drive growth. Explore our services and take the first step towards transforming your business.
      </p> */}
      <div className='radio-group'>
        <Link to="/UpdateOrgStatus">
          <button >Enable/Disable Org ⤢</button>
        </Link>
        <Link to="/FindOrgStatus">
          <button >Org Status ⤢</button>
        </Link>
        <Link to="/UpdateOrgFields">
          <button >Tax ⤢</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
