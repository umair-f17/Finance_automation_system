const db = require('../config/db');

// Enable organization
const enableOrganization = async (req, res) => {
  const { organization_id } = req.params;

  try {
    await db.execute(
      'UPDATE organization SET status = 10 WHERE id = ?',
      [organization_id]
    );

    const [rows] = await db.execute(
      'SELECT id, name, status FROM organization WHERE id = ?',
      [organization_id]
    );

    if (rows.length === 0) {
      return res.status(404).send({ message: 'Organization not found' });
    }

    res.send({
      message: 'success',
      organization: rows[0]
    });
  } catch (err) {
    console.error('Enable Error:', err);
    res.status(500).send('Failed to enable organization');
  }
};

// Disable organization
const disableOrganization = async (req, res) => {
  const { organization_id } = req.params;

  try {
    await db.execute(
      'UPDATE organization SET status = 0 WHERE id = ?',
      [organization_id]
    );

    const [rows] = await db.execute(
      'SELECT id, name, status FROM organization WHERE id = ?',
      [organization_id]
    );

    if (rows.length === 0) {
      return res.status(404).send({ message: 'Organization not found' });
    }

    res.send({
      message: 'success',
      organization: rows[0]
    });
  } catch (err) {
    console.error('Disable Error:', err);
    res.status(500).send('Failed to disable organization');
  }
};

// Find organizations by status
const findOnStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT id, name, status FROM organization WHERE status = ?',
      [status]
    );

    res.send({
      organization: rows 
    });
  } catch (err) {
    console.error('Query Error:', err);
    res.status(500).send('Failed to load data');
  }
};

// updateOrganizationFields
const updateOrganizationFields = async (req, res) => {
  const { organization_id } = req.params;

  if (!organization_id) {
    return res.status(400).send({ message: 'Organization ID is required' });
  }

  const fields = ['ntn', 'strn','kntn', 'sr_entity', 'sr_user', 'sr_key', 'pos_id'];
  const updates = [];
  const values = [];
  const updatedFields = []; 

  fields.forEach((field) => {
    const value = req.body[field];
    if (value !== undefined && value !== '') {
      if (field === 'strn') {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) return;
        updates.push(`${field} = ?`);
        values.push(parsed);
        updatedFields.push(field); 
      } else {
        updates.push(`${field} = ?`);
        values.push(value);
        updatedFields.push(field); 
      }
    }
  });

  if (updates.length === 0) {
    return res.status(400).send({ message: 'No valid fields provided to update' });
  }

  try {
    values.push(organization_id); // for WHERE clause
    const [result] = await db.execute(
      `UPDATE organization SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Organization not found' });
    }

    const [rows] = await db.execute(
      'SELECT id, ntn, strn, sr_entity, sr_user, sr_key, pos_id FROM organization WHERE id = ?',
      [organization_id]
    );

    res.send({
      message: 'Organization fields updated successfully',
      organization: rows[0],
      updatedFields: updatedFields // Send updated fields
    });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).send('Failed to update organization fields');
  }
};



module.exports = {
  enableOrganization,
  disableOrganization,
  findOnStatus,
  updateOrganizationFields
};
