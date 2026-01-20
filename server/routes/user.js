import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { get, all, run } from '../db.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await get('SELECT id, email, fullName, phone, testimonialAllowed, createdAt FROM users WHERE id = ?', [req.userId]);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get user bookings (dashboard)
router.get('/bookings', authenticateUser, async (req, res) => {
  try {
    const bookings = await all(
      `SELECT * FROM bookings WHERE userId = ? ORDER BY createdAt DESC`,
      [req.userId]
    );

    const upcoming = bookings.filter(b => new Date(b.tripStartDate) > new Date() && b.status !== 'cancelled');
    const past = bookings.filter(b => new Date(b.tripStartDate) <= new Date() || b.status === 'cancelled');

    res.json({
      upcomingTrips: upcoming,
      pastTrips: past,
      all: bookings
    });
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get single booking
router.get('/bookings/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await get(
      'SELECT * FROM bookings WHERE id = ? AND userId = ?',
      [req.params.id, req.userId]
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking });
  } catch (err) {
    console.error('Get booking error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create booking
router.post('/bookings', authenticateUser, async (req, res) => {
  try {
    const { destinationSlug, packageSlug, packageName, amount, currency, tripStartDate, tripEndDate } = req.body;

    if (!destinationSlug || !packageSlug || !packageName || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await run(
      `INSERT INTO bookings (userId, destinationSlug, packageSlug, packageName, amount, currency, tripStartDate, tripEndDate, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [req.userId, destinationSlug, packageSlug, packageName, amount, currency || 'INR', tripStartDate, tripEndDate]
    );

    res.status(201).json({
      message: 'Booking created',
      bookingId: result.lastID
    });
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
