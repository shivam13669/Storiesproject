import express from 'express';
import { authenticateUser, authenticateAdmin } from '../middleware/auth.js';
import { get, all, run } from '../db.js';

const router = express.Router();

// Get all published testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await all(
      'SELECT id, email, name, content, rating, image, createdAt FROM testimonials WHERE isPublished = 1 ORDER BY createdAt DESC',
      []
    );

    res.json({ testimonials });
  } catch (err) {
    console.error('Get testimonials error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Submit testimonial (requires login)
router.post('/submit', authenticateUser, async (req, res) => {
  try {
    const { content, rating, image } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Testimonial content is required' });
    }

    // Check if user is allowed to submit testimonials
    const user = await get('SELECT testimonialAllowed FROM users WHERE id = ?', [req.userId]);
    
    if (!user || !user.testimonialAllowed) {
      return res.status(403).json({ error: 'You have not done any trip' });
    }

    // Check if user has completed any trip
    const completedTrip = await get(
      'SELECT id FROM bookings WHERE userId = ? AND status = ? AND tripEndDate < datetime("now")',
      [req.userId, 'completed']
    );

    if (!completedTrip && !user.testimonialAllowed) {
      return res.status(403).json({ error: 'You have not done any trip' });
    }

    // Get user info
    const userInfo = await get('SELECT email, fullName FROM users WHERE id = ?', [req.userId]);

    const result = await run(
      `INSERT INTO testimonials (userId, email, name, content, rating, image, isPublished)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [req.userId, userInfo.email, userInfo.fullName, content, rating || null, image || null]
    );

    res.status(201).json({
      message: 'Testimonial submitted successfully',
      testimonialId: result.lastID
    });
  } catch (err) {
    console.error('Submit testimonial error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get user's testimonials
router.get('/my-testimonials', authenticateUser, async (req, res) => {
  try {
    const testimonials = await all(
      'SELECT * FROM testimonials WHERE userId = ? ORDER BY createdAt DESC',
      [req.userId]
    );

    res.json({ testimonials });
  } catch (err) {
    console.error('Get user testimonials error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
