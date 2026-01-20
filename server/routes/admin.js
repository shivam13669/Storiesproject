import express from 'express';
import bcryptjs from 'bcryptjs';
import { authenticateAdmin } from '../middleware/auth.js';
import { get, all, run } from '../db.js';

const router = express.Router();

// Get all users
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await all(
      'SELECT id, email, fullName, phone, testimonialAllowed, createdAt FROM users ORDER BY createdAt DESC',
      []
    );

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const bookings = await all(
          'SELECT COUNT(*) as count FROM bookings WHERE userId = ?',
          [user.id]
        );
        return {
          ...user,
          bookingCount: bookings[0]?.count || 0
        };
      })
    );

    res.json({ users: usersWithStats });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get single user
router.get('/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const user = await get(
      'SELECT id, email, fullName, phone, testimonialAllowed, createdAt FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bookings = await all(
      'SELECT * FROM bookings WHERE userId = ? ORDER BY createdAt DESC',
      [user.id]
    );

    res.json({ user, bookings });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Toggle testimonial permission for user
router.patch('/users/:id/testimonial-permission', authenticateAdmin, async (req, res) => {
  try {
    const { allowed } = req.body;

    const user = await get('SELECT id FROM users WHERE id = ?', [req.params.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await run(
      'UPDATE users SET testimonialAllowed = ? WHERE id = ?',
      [allowed ? 1 : 0, req.params.id]
    );

    res.json({ message: 'Testimonial permission updated' });
  } catch (err) {
    console.error('Toggle testimonial error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Reset user password
router.post('/users/:id/reset-password', authenticateAdmin, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    const user = await get('SELECT id FROM users WHERE id = ?', [req.params.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    await run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.params.id]);

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
router.get('/bookings', authenticateAdmin, async (req, res) => {
  try {
    const bookings = await all(
      `SELECT b.*, u.fullName, u.email FROM bookings b
       LEFT JOIN users u ON b.userId = u.id
       ORDER BY b.createdAt DESC`,
      []
    );

    res.json({ bookings });
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Cancel booking
router.patch('/bookings/:id/cancel', authenticateAdmin, async (req, res) => {
  try {
    const booking = await get('SELECT id FROM bookings WHERE id = ?', [req.params.id]);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await run(
      'UPDATE bookings SET status = ? WHERE id = ?',
      ['cancelled', req.params.id]
    );

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('Cancel booking error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all testimonials
router.get('/testimonials', authenticateAdmin, async (req, res) => {
  try {
    const testimonials = await all(
      'SELECT * FROM testimonials ORDER BY createdAt DESC',
      []
    );

    res.json({ testimonials });
  } catch (err) {
    console.error('Get testimonials error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Remove/disable testimonial
router.delete('/testimonials/:id', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await get('SELECT id FROM testimonials WHERE id = ?', [req.params.id]);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    await run('UPDATE testimonials SET isPublished = 0 WHERE id = ?', [req.params.id]);

    res.json({ message: 'Testimonial removed' });
  } catch (err) {
    console.error('Remove testimonial error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Export users data
router.get('/export/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await all(
      'SELECT id, email, fullName, phone, testimonialAllowed, createdAt FROM users ORDER BY createdAt DESC',
      []
    );

    // For now, return JSON. Will implement Excel export later
    res.json({
      data: users,
      format: 'json',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Export users error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
