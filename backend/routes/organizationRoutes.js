const express = require('express');
const {
  enableOrganization,
  disableOrganization,
  findOnStatus,
  updateOrganizationFields 
} = require('../controllers/organizationController');

const router = express.Router();

// Enable organization
router.put('/enable/:organization_id', enableOrganization);

// Disable organization
router.put('/disable/:organization_id', disableOrganization);

// Get status of organizations
router.get('/get/:status', findOnStatus);

// ✅ Update specific organization fields
router.put('/update/:organization_id', updateOrganizationFields);

module.exports = router;
