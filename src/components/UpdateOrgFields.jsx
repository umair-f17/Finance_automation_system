import React, { useState } from 'react';

const UpdateOrgFields = () => {
  const [organizationId, setOrganizationId] = useState('');
  const [formData, setFormData] = useState({
    ntn: '',
    strn: '',
    kntn: '',
    sr_entity: '',
    sr_user: '',
    sr_key: '',
    pos_id: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organizationId) {
      setMessage('Organization ID is required');
      return;
    }

    const bodyData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== '') {
        bodyData[key] = formData[key];
      }
    });

    if (Object.keys(bodyData).length === 0) {
      setMessage('Please enter at least one field to update');
      return;
    }
    setMessage('')
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/organization/update/${organizationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Update failed');
      }

      const updatedFieldsMessage = result.updatedFields.length
        ? `${result.updatedFields.join(', ')}`
        : 'No fields updated';

      setMessage(`${updatedFieldsMessage} , updated in ${organizationId}`);
    } catch (error) {
      console.error('Update failed:', error);
      setMessage(error.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <h1>Enable Tax</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Organization ID"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="text"
          name="ntn"
          placeholder="NTN"
          value={formData.ntn}
          onChange={handleChange}
          disabled={loading}

        />
        <input
          type="text"
          name="strn"
          placeholder="STRN"
          value={formData.strn}
          onChange={handleChange}
          disabled={loading}

        />
        <input
          type="text"
          name="kntn"
          placeholder="KNTN"
          value={formData.kntn}
          onChange={handleChange}
          disabled={loading}

        />
        <input
          type="text"
          name="sr_entity"
          placeholder="Sr_Entity"
          value={formData.sr_entity}
          onChange={handleChange}
          disabled={loading}

        />
        <input
          type="text"
          name="sr_user"
          placeholder="Sr_User (Id)"
          value={formData.sr_user}
          onChange={handleChange}
          disabled={loading}

        />
        <input
          type="text"
          name="sr_key"
          placeholder="Sr_Key (Token)"
          value={formData.sr_key}
          onChange={handleChange}
          disabled={loading}

        />
        <input
          type="text"
          name="pos_id"
          placeholder="Pos_Id"
          value={formData.pos_id}
          onChange={handleChange}
          disabled={loading}

        />

        {organizationId && (
          <button type="submit" disabled={loading}>
            Update
          </button>
        )}
      </form>

      <br />

      {loading && <p>Loading...</p>}

      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateOrgFields;
