const express = require('express');
const { body, param } = require('express-validator');
const db = require('../db');
const { validate } = require('../middleware/validate');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/projects (public)
router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT id, title, description, imageUrl, projectUrl, techStack, createdAt, updatedAt
    FROM projects
    ORDER BY createdAt DESC
  `).all();
  const data = rows.map((r) => ({
    ...r,
    techStack: r.techStack ? JSON.parse(r.techStack) : [],
  }));
  res.json({ success: true, data });
});

// GET /api/projects/:id (public)
router.get(
  '/:id',
  [param('id').isInt({ min: 1 }).withMessage('Invalid project ID')],
  validate([param('id').isInt({ min: 1 }).withMessage('Invalid project ID')]),
  (req, res) => {
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        statusCode: 404,
      });
    }
    const data = {
      ...row,
      techStack: row.techStack ? JSON.parse(row.techStack) : [],
    };
    res.json({ success: true, data });
  }
);

// POST /api/projects (protected)
router.post(
  '/',
  authMiddleware,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('imageUrl').optional({ values: 'falsy' }).trim().isURL().withMessage('imageUrl must be a valid URL'),
    body('projectUrl').optional({ values: 'falsy' }).trim().isURL().withMessage('projectUrl must be a valid URL'),
    body('techStack').optional().isArray().withMessage('techStack must be an array'),
  ],
  validate([
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
  ]),
  (req, res) => {
    const { title, description, imageUrl, projectUrl, techStack } = req.body;
    const techStackStr = Array.isArray(techStack) ? JSON.stringify(techStack) : '[]';
    const result = db.prepare(`
      INSERT INTO projects (title, description, imageUrl, projectUrl, techStack)
      VALUES (?, ?, ?, ?, ?)
    `).run(title, description, imageUrl || null, projectUrl || null, techStackStr);
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
    const data = {
      ...row,
      techStack: row.techStack ? JSON.parse(row.techStack) : [],
    };
    res.status(201).json({ success: true, data });
  }
);

// PUT /api/projects/:id (protected)
router.put(
  '/:id',
  authMiddleware,
  [
    param('id').isInt({ min: 1 }).withMessage('Invalid project ID'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('imageUrl').optional({ values: 'falsy' }).trim().isURL().withMessage('imageUrl must be a valid URL'),
    body('projectUrl').optional({ values: 'falsy' }).trim().isURL().withMessage('projectUrl must be a valid URL'),
    body('techStack').optional().isArray().withMessage('techStack must be an array'),
  ],
  validate([param('id').isInt({ min: 1 }).withMessage('Invalid project ID')]),
  (req, res) => {
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        statusCode: 404,
      });
    }
    const { title, description, imageUrl, projectUrl, techStack } = req.body;
    const updates = {
      title: title !== undefined ? title : existing.title,
      description: description !== undefined ? description : existing.description,
      imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
      projectUrl: projectUrl !== undefined ? projectUrl : existing.projectUrl,
      techStack: techStack !== undefined ? JSON.stringify(techStack) : existing.techStack,
    };
    db.prepare(`
      UPDATE projects
      SET title = ?, description = ?, imageUrl = ?, projectUrl = ?, techStack = ?, updatedAt = datetime('now')
      WHERE id = ?
    `).run(updates.title, updates.description, updates.imageUrl, updates.projectUrl, updates.techStack, req.params.id);
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    const data = { ...row, techStack: row.techStack ? JSON.parse(row.techStack) : [] };
    res.json({ success: true, data });
  }
);

// DELETE /api/projects/:id (protected)
router.delete(
  '/:id',
  authMiddleware,
  [param('id').isInt({ min: 1 }).withMessage('Invalid project ID')],
  validate([param('id').isInt({ min: 1 }).withMessage('Invalid project ID')]),
  (req, res) => {
    const result = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        statusCode: 404,
      });
    }
    res.json({ success: true, message: 'Project deleted' });
  }
);

module.exports = router;
