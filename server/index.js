const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const messagesRoutes = require('./routes/messages');

const app = express();

app.use(express.json({ limit: '500kb' }));

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || config.corsOrigin.includes(origin)) return cb(null, true);
    if (config.nodeEnv === 'development') return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests.', statusCode: 429 },
});
app.use('/api', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts.', statusCode: 429 },
});
app.use('/api/auth/login', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/messages', messagesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'OK' });
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Portfolio API running on http://localhost:${config.port}`);
});
