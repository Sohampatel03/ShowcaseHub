const express = require('express');
const Client = require('../models/Client');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadToCloudinary } = require('../utils/cloudinary');

const router = express.Router();

// PUBLIC: GET /api/clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error('Get clients error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN: POST /api/admin/clients (create)
router.post(
  '/admin/clients',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, designation, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const uploadResult = await uploadToCloudinary(req.file.buffer, 'clients');

      const client = await Client.create({
        name,
        designation,
        description,
        imageUrl: uploadResult.secure_url
      });

      res.status(201).json(client);
    } catch (err) {
      console.error('Create client error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ADMIN: GET /api/admin/clients (list)
router.get('/admin/clients', auth, async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error('Get admin clients error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN: PUT /api/admin/clients/:id (update with optional new image)
router.put(
  '/admin/clients/:id',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, designation, description } = req.body;
      const updateData = { name, designation, description };

      if (req.file) {
        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          'clients'
        );
        updateData.imageUrl = uploadResult.secure_url;
      }

      const client = await Client.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      res.json(client);
    } catch (err) {
      console.error('Update client error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ADMIN: DELETE /api/admin/clients/:id
router.delete('/admin/clients/:id', auth, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Delete client error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
