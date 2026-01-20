import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function generateToken(userId, role = 'user') {
  return jwt.sign(
    { userId, role, type: 'access' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    
    if (decoded.role !== 'user') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export function authenticateAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.adminId = decoded.userId;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}
