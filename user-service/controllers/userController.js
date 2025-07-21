const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ REGISTER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("📩 Incoming data:", { name, email, password });

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log("🔍 Existing user check:", existingUser.rows);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    console.log("✅ User inserted:", newUser.rows[0]);

    res.status(201).json({ message: 'User registered', user: newUser.rows[0] });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ PROTECTED ROUTE
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Protected route accessed',
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ✅ EXPORT
module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
