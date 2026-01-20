import bcryptjs from 'bcryptjs';
import { run, get, initializeDatabase } from './db.js';

async function setupAdmin() {
  try {
    console.log('Initializing database...');
    initializeDatabase();

    // Wait a moment for database to initialize
    await new Promise(resolve => setTimeout(resolve, 1000));

    const adminEmail = 'nitinmishra2202@gmail.com';
    const adminPassword = 'stnt@stories123@';

    // Check if admin already exists
    const existingAdmin = await get('SELECT id FROM admin WHERE email = ?', [adminEmail]);
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(adminPassword, 10);

    // Create admin
    const result = await run(
      'INSERT INTO admin (email, password) VALUES (?, ?)',
      [adminEmail, hashedPassword]
    );

    console.log('Admin user created successfully');
    console.log('Email:', adminEmail);
    console.log('Admin ID:', result.lastID);
    process.exit(0);
  } catch (err) {
    console.error('Setup error:', err);
    process.exit(1);
  }
}

setupAdmin();
