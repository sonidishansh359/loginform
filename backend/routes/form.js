const express = require('express');
const router = express.Router();
const FormData = require('../models/formData');
const crypto = require('crypto');

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

// GET route to get fingerprint challenge
router.get('/fingerprint-challenge/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const formData = await FormData.findById(id);
    if (!formData) {
      return res.status(404).json({ error: 'Form data not found' });
    }
    // Generate a random challenge
    const challenge = crypto.randomBytes(32).toString('base64');
    res.status(200).json({ challenge });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate challenge' });
  }
});

// POST route to verify fingerprint
router.post('/fingerprint-verify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const formData = await FormData.findById(id);
    if (!formData) {
      return res.status(404).json({ error: 'Form data not found' });
    }
    // For simplicity, assume verification succeeds if credential is provided
    // In a real implementation, you'd verify the credential against stored public key
    if (req.body) {
      await FormData.findByIdAndUpdate(id, { fingerprintCaptured: true });
      res.status(200).json({ message: 'Fingerprint verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid credential' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify fingerprint' });
  }
});

module.exports = router;
