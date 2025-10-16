const express = require('express');
const router = express.Router();
const FormData = require('../models/formData');

// POST route to save form data
router.post('/', async (req, res) => {
  try {
    const { name, email, address, dob, age, aadharcard } = req.body;
    const newFormData = new FormData({ name, email, address, dob, age, aadharcard });
    await newFormData.save();
    res.status(201).json({ message: 'Form data saved successfully', id: newFormData._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save form data' });
  }
});

// PUT route to update fingerprint status
router.put('/fingerprint/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFormData = await FormData.findByIdAndUpdate(id, { fingerprintCaptured: true }, { new: true });
    if (!updatedFormData) {
      return res.status(404).json({ error: 'Form data not found' });
    }
    res.status(200).json({ message: 'Fingerprint captured successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update fingerprint status' });
  }
});

module.exports = router;
