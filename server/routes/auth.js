const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const db = require('../db');
const config = require('../config');
const { validate } = require('../middleware/validate');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validate([
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ]),
  (req, res, next) => {
    const { email, password } = req.body;
    const admin = db.prepare('SELECT * FROM admin WHERE id = 1').get();
    if (!admin) {
      return res.status(500).json({
        success: false,
        message: 'Admin not configured. Run seed first.',
        statusCode: 500,
      });
    }
    if (admin.email !== email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        statusCode: 401,
      });
    }
    const match = bcrypt.compareSync(password, admin.passwordHash);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        statusCode: 401,
      });
    }
    const token = jwt.sign(
      { id: 1, email: admin.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    return res.json({
      success: true,
      data: { token, email: admin.email },
    });
  }
);

// GET /api/auth/me (protected)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

// POST /api/auth/logout (client discards token; optional endpoint)
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out.' });
});

module.exports = router;
