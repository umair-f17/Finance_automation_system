import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/UpdateOrgStatus.css';

const UpdateOrgStatus = () => {
  const [orgId, setOrgId] = useState('');
  const [message, setMessage] = useState('');
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(false); 
  
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL


  const handleEnable = async () => {
    setOrgData(null)
    setMessage('')
    setLoading(true); 
    setError(''); 
    try {
      const response = await fetch(`${apiUrl}/organization/enable/${orgId}`, {
        method: 'PUT',
      });
      const data = await response.json();
      setMessage(data.message);
      setOrgData(data.organization);
    } catch (error) {
      setError('Failed to enable organization');
    } finally {
      setLoading(false); 
    }
  };

  const handleDisable = async () => {
    setOrgData(null)
    setMessage('')
    setLoading(true); 
    setError(''); 
    try {
      const response = await fetch(`${apiUrl}/organization/disable/${orgId}`, {
        method: 'PUT',
      });
      const data = await response.json();
      setMessage(data.message);
      setOrgData(data.organization);
    } catch (error) {
      setError('Failed to disable organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <h1>Enable/Disable Organizations</h1>
      <div className="form-group">
        <label htmlFor="orgId">Organization ID:</label>
        <input
          type="text"
          id="orgId"
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          placeholder="Enter Organization ID"
          required
        />
      </div>

      {orgId && (
        <div className="form-group">
          <label>Status:</label>
          <div className="radio-group">
            <button 
              disabled={loading} 
              onClick={handleEnable}>
              Enable Org
            </button>
            <button 
              disabled={loading} 
              onClick={handleDisable}>
              Disable Org
            </button>
          </div>
        </div>
      )}
      {loading && <p>Loading...</p>} 

      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}
      {orgData && (
        <div>
          <p><strong>ID:</strong> {orgData.id}</p>
          <p><strong>Name:</strong> {orgData.name}</p>
          <strong>Status:</strong> {orgData.status === 10 ? '(10) Enabled' : '(0) Disabled'}
          <br />
          <br />
          <hr />
          <Link to={'/FindOrgStatus'}>See Org Status</Link>
        </div>
      )}
    </div>
  );
};

export default UpdateOrgStatus;
