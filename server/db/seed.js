const bcrypt = require('bcryptjs');
const config = require('../config');
const db = require('./index');

// Seed admin user
const hash = bcrypt.hashSync(config.admin.password, 12);
db.prepare(`
  INSERT INTO admin (id, email, passwordHash, updatedAt)
  VALUES (1, ?, ?, datetime('now'))
  ON CONFLICT(id) DO UPDATE SET email = excluded.email, passwordHash = excluded.passwordHash, updatedAt = excluded.updatedAt
`).run(config.admin.email, hash);
console.log('Admin seeded. Email:', config.admin.email);

// Seed sample projects (only if table is empty)
const count = db.prepare('SELECT COUNT(*) as n FROM projects').get();
if (count.n === 0) {
  const insertProject = db.prepare(`
    INSERT INTO projects (title, description, imageUrl, projectUrl, techStack)
    VALUES (?, ?, ?, ?, ?)
  `);
  const projects = [
    { title: 'Brazely Restaurant', description: 'Luxury Syrian Restaurant Website', projectUrl: 'https://ahmedbadawix77x-gif.github.io/Brazely-luxury-Syrian-restaurant-website/', techStack: ['HTML5', 'CSS3', 'JavaScript'] },
    { title: 'Bondok Portfolio', description: 'Graphic Designer Portfolio Website', projectUrl: 'https://ahmedbadawix77x-gif.github.io/bondok-portfolio7/', techStack: ['HTML5', 'CSS3', 'JavaScript'] },
    { title: 'Flower Shop', description: 'Vibrant E-commerce floral store', projectUrl: 'https://ahmedbadawix77x-gif.github.io/Flower-Shop/', techStack: ['HTML5', 'CSS3', 'JavaScript'] },
    { title: 'Basbosa', description: 'Luxury Egyptian Dessert Shop', projectUrl: 'https://ahmedbadawix77x-gif.github.io/Basbosa/', techStack: ['HTML5', 'CSS3', 'JavaScript'] },
    { title: 'Shopery', description: 'Premium Organic Ecommerce Store', projectUrl: 'https://ahmedbadawix77x-gif.github.io/Shopery/', techStack: ['React', 'JavaScript'] },
  ];
  for (const p of projects) {
    insertProject.run(p.title, p.description, null, p.projectUrl, JSON.stringify(p.techStack));
  }
  console.log('Projects seeded:', projects.length);
}
