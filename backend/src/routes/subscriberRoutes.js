const express = require('express');
const Subscriber = require('../models/Subscriber');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// PUBLIC: POST /api/newsletter/subscribe
router.post('/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    let sub = await Subscriber.findOne({ email });
    if (!sub) {
      sub = await Subscriber.create({ email });
    }

    res.status(201).json({ message: 'Subscribed successfully', subscriber: sub });
  } catch (err) {
    console.error('Subscribe error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN: GET /api/admin/subscribers
router.get('/admin/subscribers', auth, async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    console.error('Get subscribers error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
