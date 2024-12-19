const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Models
const User = require('./models/User');
const Estimate = require('./models/Estimate');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://saipandupatt143:20Mp1B1tDXmsDH8g@cluster0.cgm1r.mongodb.net/Auth', {
      tls: true,
      tlsInsecure: true, // Optional: Allows insecure connections (not recommended for production)
      useNewUrlParser: true, // No effect since Mongoose 6+
      useUnifiedTopology: true, // No effect since Mongoose 6+
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// -------------------- Authentication Middleware --------------------
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header
  if (!token) return res.status(401).json({ message: 'Unauthorized - No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden - Invalid token' });
    req.userId = decoded.userId;
    next();
  });
}

// -------------------- Routes --------------------
const router = express.Router();

// Save Estimate
router.post('/save-estimate', authenticateToken, async (req, res) => {
  try {
    const { apartmentType, carpetArea, modularKitchen, selectedPackage, bedrooms, costBreakdown } = req.body;

    const estimate = new Estimate({
      userId: req.userId,
      apartmentType,
      carpetArea,
      modularKitchen,
      selectedPackage,
      bedrooms,
      costBreakdown,
    });

    await estimate.save();
    res.status(201).json({ message: 'Estimate saved successfully!', estimate });
  } catch (error) {
    console.error('Error saving estimate:', error.message);
    res.status(500).json({ message: 'Failed to save estimate', error: error.message });
  }
});

// Fetch Recent Estimates
router.get('/recent-estimates', authenticateToken, async (req, res) => {
  try {
    const estimates = await Estimate.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(estimates);
  } catch (error) {
    console.error('Error fetching recent estimates:', error.message);
    res.status(500).json({ message: 'Failed to fetch recent estimates', error: error.message });
  }
});

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    // Respond with the token and username
    res.status(200).json({ 
      message: 'Login successful!', 
      token, 
      username: user.username // Make sure `username` exists in your User model
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
 

// Attach Routes
app.use('/api/auth', router);

// -------------------- Server Setup --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
