import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { get, all } from '../db.js';

const router = express.Router();

// Get user's bookings (user can see their own bookings)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const bookings = await all(
      'SELECT * FROM bookings WHERE userId = ? ORDER BY createdAt DESC',
      [req.userId]
    );

    res.json({ bookings });
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get booking details
router.get('/:id', authenticateUser, async (req, res) => {
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

export default router;
