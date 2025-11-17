const express = require('express');
const Contact = require('../models/Contact');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// PUBLIC: POST /api/contact
router.post('/contact', async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = await Contact.create({ fullName, email, mobile, city });

    res.status(201).json({ message: 'Contact saved', contact });
  } catch (err) {
    console.error('Create contact error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN: GET /api/admin/contacts
router.get('/admin/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('Get contacts error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
