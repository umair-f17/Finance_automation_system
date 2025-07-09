import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FindOrgStatus from './components/FindOrgStatus';
import UpdateOrgStatus from './components/UpdateOrgStatus';
import Home from './components/Home';
import UpdateOrgFields from './components/UpdateOrgFields';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UpdateOrgStatus" element={<UpdateOrgStatus />} />
        <Route path="/FindOrgStatus" element={<FindOrgStatus/>} />
        <Route path='/UpdateOrgFields' element={<UpdateOrgFields/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
