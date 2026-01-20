import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../database.db');

let db = null;
let SQL = null;

async function initSQL() {
  if (!SQL) {
    SQL = await initSqlJs();
  }
  return SQL;
}

async function getDatabase() {
  if (!db) {
    await initSQL();
    
    if (fs.existsSync(DB_PATH)) {
      const buffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
    }
    console.log('Connected to SQLite database');
  }
  return db;
}

function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

export async function initializeDatabase() {
  const database = await getDatabase();

  const tables = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      testimonialAllowed INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // Admin table
    `CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // Bookings table
    `CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      destinationSlug TEXT NOT NULL,
      packageSlug TEXT NOT NULL,
      packageName TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'INR',
      status TEXT DEFAULT 'pending',
      bookingDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      tripStartDate DATE,
      tripEndDate DATE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // Testimonials table
    `CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      email TEXT,
      name TEXT,
      content TEXT NOT NULL,
      rating INTEGER,
      image TEXT,
      isPublished INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
    )`
  ];

  for (const sql of tables) {
    try {
      database.run(sql);
    } catch (err) {
      // Table already exists
    }
  }

  saveDatabase();
  console.log('Database tables initialized');
}

export async function run(sql, params = []) {
  try {
    const database = await getDatabase();
    database.run(sql, params);
    saveDatabase();
    return { lastID: database.getRowsModified(), changes: database.getRowsModified() };
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
}

export async function get(sql, params = []) {
  try {
    const database = await getDatabase();
    const result = database.exec(sql, params);
    
    if (result.length === 0) {
      return undefined;
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    
    if (!values) {
      return undefined;
    }

    const row = {};
    columns.forEach((col, i) => {
      row[col] = values[i];
    });
    return row;
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
}

export async function all(sql, params = []) {
  try {
    const database = await getDatabase();
    const result = database.exec(sql, params);
    
    if (result.length === 0) {
      return [];
    }

    const columns = result[0].columns;
    const rows = result[0].values;

    return rows.map(values => {
      const row = {};
      columns.forEach((col, i) => {
        row[col] = values[i];
      });
      return row;
    });
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
}
