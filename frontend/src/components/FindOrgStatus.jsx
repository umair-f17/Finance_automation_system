import React, { useState, useEffect } from 'react';
import '../css/FindOrgStatus.css';

const FindOrgStatus = () => {
  const [status, setStatus] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (!status) return;

    const fetchOrganizations = async () => {
      setOrganizations([]);
      setError(null);
      setMessage('');
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/organization/get/${status}`);
        if (!response.ok) throw new Error('Failed to fetch organizations');
        const data = await response.json();
        const orgs = data.organization || [];
        setOrganizations(orgs);
        if (orgs.length === 0) {
          setMessage('No organizations match the selected status.');
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError('Error fetching organizations.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [status]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setSearch('');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredOrganizations = search
    ? organizations.filter(org =>
        org.name.toLowerCase().includes(search)
      )
    : organizations;

  return (
    <div className="page-layout">
      <h1>Check Organization Status</h1>
      <div className="status-dropdown">
        <label>Status:</label>
        <select value={status} onChange={handleStatusChange} disabled={loading}>
          <option value="">Select Status</option>
          <option value="10">Enable</option>
          <option value="0">Disable</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {status && !loading && (
        <>
          <input
            type="search"
            id="search"
            className="input-field"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
            disabled={loading}
          />

          {filteredOrganizations.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Organization ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map((org) => (
                  <tr key={org.id}>
                    <td>{org.name}</td>
                    <td>{org.id}</td>
                    <td>{org.status === 10 ? 'Enabled' : 'Disabled'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <h2>No Organizations Found</h2>
              <p>{message || 'No results match your search.'}</p>
            </div>
          )}
        </>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FindOrgStatus;
