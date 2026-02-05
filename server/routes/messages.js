const express = require('express');
const { body, param } = require('express-validator');
const db = require('../db');
const { validate } = require('../middleware/validate');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/messages (public - contact form)
router.post(
  '/',
  [
    body('name').trim().notEmpty().isLength({ max: 200 }).withMessage('Name is required (max 200 chars)'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('message').trim().notEmpty().isLength({ max: 5000 }).withMessage('Message is required (max 5000 chars)'),
  ],
  validate([
    body('name').trim().notEmpty().isLength({ max: 200 }).withMessage('Name is required (max 200 chars)'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('message').trim().notEmpty().isLength({ max: 5000 }).withMessage('Message is required (max 5000 chars)'),
  ]),
  (req, res) => {
    const { name, email, message } = req.body;
    const result = db.prepare(`
      INSERT INTO messages (name, email, message)
      VALUES (?, ?, ?)
    `).run(name, email, message);
    const row = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: row });
  }
);

// GET /api/messages (protected - admin only)
router.get('/', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT * FROM messages ORDER BY createdAt DESC').all();
  res.json({ success: true, data: rows });
});

// DELETE /api/messages/:id (protected)
router.delete(
  '/:id',
  authMiddleware,
  [param('id').isInt({ min: 1 }).withMessage('Invalid message ID')],
  validate([param('id').isInt({ min: 1 }).withMessage('Invalid message ID')]),
  (req, res) => {
    const result = db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
        statusCode: 404,
      });
    }
    res.json({ success: true, message: 'Message deleted' });
  }
);

module.exports = router;
