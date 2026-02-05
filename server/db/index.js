const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'portfolio.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Projects table
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT,
    projectUrl TEXT,
    techStack TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  )
`);

// Messages table
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime('now'))
  )
`);

// Admin table (single row for credentials)
db.exec(`
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    updatedAt TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;
