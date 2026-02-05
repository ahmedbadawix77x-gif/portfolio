# 💫 Ahmed Badawy – Personal Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-%E2%9C%93-4CC9F0?style=for-the-badge&logo=vercel&logoColor=white)](https://ahmedbadawi.dev)
[![License](https://img.shields.io/badge/License-MIT-3A0CA3?style=for-the-badge)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)

> **"Clean. Cinematic. Professional."**  
> A modern, highly animated portfolio with **backend API** for projects, contact messages, and admin auth.

---

## 🌟 Features

| Feature | Description |
| -------- | ------------- |
| **✨ Cinematic Animations** | Smooth scroll, AOS, and interactive 3D hover effects. |
| **🎨 Premium Visual Design** | Dark theme, gradient accents, neon highlights. |
| **🖼️ Projects** | Static cards by default; **dynamic from API** when backend is running. |
| **📧 Contact Form** | Submits to `/api/messages` when API is available; fallback message otherwise. |
| **🔐 Admin** | JWT login at `admin.html`; view and delete contact messages. |
| **📱 Fully Responsive** | Mobile, tablet, laptop, desktop. |
| **🔗 Backend API** | RESTful `/api` – auth, projects CRUD, messages. |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5**, **CSS3** (Flexbox, Grid, variables)
- **Vanilla JavaScript** (no framework)
- **AOS**, **Font Awesome**, **Google Fonts**

### Backend (optional)
- **Node.js** + **Express**
- **SQLite** (better-sqlite3)
- **JWT** (jsonwebtoken), **bcryptjs**, **express-validator**, **cors**, **express-rate-limit**

---

## 📁 Project Structure

```
my-portfolio-website/
├── assets/
│   ├── profile-picture.webp
│   └── Junior Web Developer CV.pdf
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── admin.js
├── server/
│   ├── index.js
│   ├── config.js
│   ├── .env.example
│   ├── db/
│   │   ├── index.js
│   │   └── seed.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   └── routes/
│       ├── auth.js
│       ├── projects.js
│       └── messages.js
├── index.html
├── admin.html
└── README.md
```

---

## 🚀 Running the Project

### Frontend only (static)
- Open `index.html` with Live Server (e.g. port 5500) or any static host.
- Contact form shows a local success message; projects are the static cards.

### With backend (API + admin)
1. **Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env: set ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET
   npm run seed
   npm run dev
   ```
   API runs at `http://localhost:3000`.

2. **Frontend**
   - Serve the project root (e.g. Live Server on port 5500).
   - `index.html` and `admin.html` auto-set `window.API_BASE = 'http://localhost:3000'` on localhost.
   - Contact form posts to `/api/messages`; projects load from `/api/projects` if available.
   - Open **Admin** → `admin.html` → login with `.env` credentials → view/delete messages.

---

## 📡 API Reference

Base: `/api`

| Method | Route | Auth | Description |
|--------|--------|------|-------------|
| POST | `/auth/login` | No | Body: `{ email, password }` → returns `{ token }` |
| GET | `/auth/me` | Yes | Returns current user |
| GET | `/projects` | No | List all projects |
| GET | `/projects/:id` | No | Single project |
| POST | `/projects` | Yes | Create project |
| PUT | `/projects/:id` | Yes | Update project |
| DELETE | `/projects/:id` | Yes | Delete project |
| POST | `/messages` | No | Submit contact message |
| GET | `/messages` | Yes | List messages (admin) |
| DELETE | `/messages/:id` | Yes | Delete message |

Protected routes: header `Authorization: Bearer <token>`.

---

## 🔒 Security

- JWT with configurable secret and expiry
- Passwords hashed with bcrypt
- Input validation (express-validator)
- CORS configurable via `CORS_ORIGIN`
- Rate limiting (general + stricter on login)

---

## 📦 Deployment

- **Frontend**: Vercel, Netlify, or any static host. Set `window.API_BASE` to your API URL if different origin.
- **Backend**: Render, Railway, etc. Set env: `PORT`, `NODE_ENV`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN`. Run `npm run seed` once (or use a startup script) to create admin user. For production DB, you can replace SQLite with PostgreSQL and adapt `server/db/index.js`.

---

## ✅ Acceptance (PRD)

- Website displays correctly on all devices; no layout breaks on mobile/tablet.
- UI improvements applied; existing content intact.
- Backend APIs: auth, projects CRUD, messages submit/list/delete.
- Performance: optimized assets, smooth animations.

---

**Product Owner:** Ahmed Badawy  
**Status:** Complete · Ready for Production
