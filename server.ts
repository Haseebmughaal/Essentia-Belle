import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULTS_FILE = path.join(__dirname, 'defaults-snapshot.json');

const db = new Database('boutique.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price REAL NOT NULL,
    rating REAL,
    category TEXT,
    description TEXT,
    image TEXT,
    notes_top TEXT,
    notes_middle TEXT,
    notes_base TEXT,
    is_featured INTEGER DEFAULT 0
  )
`);
db.exec('DELETE FROM products');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Routes
  app.get('/api/products', (req, res) => {
    try {
      const products = db.prepare('SELECT * FROM products').all();
      // Parse notes back into arrays
      const formatted = products.map((p: any) => ({
        ...p,
        notes: {
          top: p.notes_top ? p.notes_top.split(',') : [],
          middle: p.notes_middle ? p.notes_middle.split(',') : [],
          base: p.notes_base ? p.notes_base.split(',') : []
        },
        price: Number(p.price),
        rating: Number(p.rating),
        isFeatured: Boolean(p.is_featured)
      }));
      res.json(formatted);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.post('/api/products', (req, res) => {
    const p = req.body;
    try {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO products (id, name, brand, price, rating, category, description, image, notes_top, notes_middle, notes_base, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        p.id || Date.now().toString(),
        p.name,
        p.brand,
        p.price,
        p.rating,
        p.category,
        p.description,
        p.image,
        p.notes.top.join(','),
        p.notes.middle.join(','),
        p.notes.base.join(','),
        p.isFeatured ? 1 : 0
      );
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

  app.delete('/api/products/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  app.delete('/api/products', (req, res) => {
    try {
      db.prepare('DELETE FROM products').run();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to clear products' });
    }
  });

  // Admin Snapshot Routes
  app.post('/api/admin/snapshot', (req, res) => {
    try {
      const products = db.prepare('SELECT * FROM products').all();
      fs.writeFileSync(DEFAULTS_FILE, JSON.stringify(products, null, 2));
      res.json({ success: true, message: 'Current inventory saved as the new default!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save snapshot' });
    }
  });

  app.post('/api/admin/restore-snapshot', (req, res) => {
    try {
      if (!fs.existsSync(DEFAULTS_FILE)) {
        return res.status(404).json({ error: 'No snapshot found. Please save a snapshot first.' });
      }
      
      const raw = fs.readFileSync(DEFAULTS_FILE, 'utf8');
      const products = JSON.parse(raw);
      
      db.prepare('DELETE FROM products').run();
      const insert = db.prepare(`
        INSERT INTO products (id, name, brand, price, rating, category, description, image, notes_top, notes_middle, notes_base, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const transaction = db.transaction((items) => {
        for (const p of items) {
          insert.run(p.id, p.name, p.brand, p.price, p.rating, p.category, p.description, p.image, p.notes_top, p.notes_middle, p.notes_base, p.is_featured);
        }
      });
      
      transaction(products);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to restore snapshot' });
    }
  });

  // Admin Snapshot Routes
  app.post('/api/admin/snapshot', (req, res) => {
    try {
      const products = db.prepare('SELECT * FROM products').all();
      fs.writeFileSync(DEFAULTS_FILE, JSON.stringify(products, null, 2));
      res.json({ success: true, message: 'Current inventory saved as the new default!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save snapshot' });
    }
  });

  app.post('/api/admin/restore-snapshot', (req, res) => {
    try {
      if (!fs.existsSync(DEFAULTS_FILE)) {
        return res.status(404).json({ error: 'No snapshot found. Please save a snapshot first.' });
      }
      
      const raw = fs.readFileSync(DEFAULTS_FILE, 'utf8');
      const products = JSON.parse(raw);
      
      db.prepare('DELETE FROM products').run();
      const insert = db.prepare(`
        INSERT INTO products (id, name, brand, price, rating, category, description, image, notes_top, notes_middle, notes_base, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const transaction = db.transaction((items) => {
        for (const p of items) {
          insert.run(p.id, p.name, p.brand, p.price, p.rating, p.category, p.description, p.image, p.notes_top, p.notes_middle, p.notes_base, p.is_featured);
        }
      });
      
      transaction(products);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to restore snapshot' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
