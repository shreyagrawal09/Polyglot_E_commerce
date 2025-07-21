const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check if Authorization header is present and has a Bearer token
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];

    try {
      // 2️⃣ Verify token with secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Attach user data to request so the next handler can use it
      req.user = decoded;

      // 4️⃣ Move to the next middleware or controller
      next();
    } catch (err) {
      // If token is invalid or expired
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If no token is provided
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = protect;
