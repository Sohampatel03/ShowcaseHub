const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadToCloudinary } = require('../utils/cloudinary');

const router = express.Router();

// PUBLIC: GET /api/projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Get projects error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN: POST /api/admin/projects (create)
router.post(
  '/admin/projects',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const uploadResult = await uploadToCloudinary(req.file.buffer, 'projects');

      const project = await Project.create({
        name,
        description,
        imageUrl: uploadResult.secure_url
      });

      res.status(201).json(project);
    } catch (err) {
      console.error('Create project error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ADMIN: GET /api/admin/projects (list)
router.get('/admin/projects', auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Get admin projects error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN: PUT /api/admin/projects/:id (update with optional new image)
router.put(
  '/admin/projects/:id',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, description } = req.body;
      const updateData = { name, description };

      if (req.file) {
        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          'projects'
        );
        updateData.imageUrl = uploadResult.secure_url;
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json(project);
    } catch (err) {
      console.error('Update project error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ADMIN: DELETE /api/admin/projects/:id
router.delete('/admin/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Delete project error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
