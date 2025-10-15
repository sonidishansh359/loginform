const express = require('express');
const router = express.Router();
const FormData = require('../models/formData');

// POST route to save form data
router.post('/', async (req, res) => {
  try {
    const { name, email, address, dob, age, aadharcard } = req.body;
    const newFormData = new FormData({ name, email, address, dob, age, aadharcard });
    await newFormData.save();
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save form data' });
  }
});

module.exports = router;
