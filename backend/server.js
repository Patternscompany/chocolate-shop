const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

// Models
const User = require('./models/User');
const Cart = require('./models/Cart'); // Import the Cart model
const Estimate = require('./models/Estimate');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://saipandupatt143:20Mp1B1tDXmsDH8g@cluster0.cgm1r.mongodb.net/Auth', {
      tls: true,
      tlsInsecure: true, // Optional: Allows insecure connections (not recommended for production)
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Connect to MongoDB
connectDB();

// -------------------- Authentication Middleware --------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
    req.userId = decoded.userId; // Attach userId to request
    next();
  });
};

// -------------------- Routes --------------------
const router = express.Router();


// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });


// MySQL connection
const db = mysql.createConnection({
  host: 'db4free.net',
  user: 'panduranga',
  password: 'Pandu@123',
  database: 'pandureddy',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});
app.use('/uploads', express.static('uploads'));


// API to upload and save image as BLOB
// app.post('/upload', upload.single('image'), (req, res) => {
//   const image = fs.readFileSync(req.file.path);
//   const sql = 'INSERT INTO items (name, price, image) VALUES (?, ?, ?)';
//   const data = ['Chocolate Box', 15.99, image];

//   db.query(sql, data, (err, result) => {
//       if (err) throw err;
//       res.json({ message: 'Image uploaded and saved to database' });
//   });
// });


// Define a GET route for /items
app.get('/items', (req, res) => {
  const sqlQuery = 'SELECT * FROM items'; // Adjust based on your table name and structure

  db.query(sqlQuery, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Failed to fetch data from the database' });
      } else {
          res.status(200).json(results); // Send the database results as the response
      }
  });
});


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

app.get('/product/:id', (req, res) => {
  const sql = 'SELECT * FROM items WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;

      const product = result[0];
      product.image = `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`;
      res.json(product);
  });
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





// Save Cart
router.post("/cart", authenticateToken, async (req, res) => {
  try {
    let { items } = req.body;

    // Convert `_id` to `productId` and ensure ObjectId format
    items = items.map((item) => ({
      productId: new mongoose.Types.ObjectId(item._id), // Convert _id to ObjectId
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    }));

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({ userId: req.userId, items });
    } else {
      cart.items = items;
    }

    await cart.save();
    res.status(200).json({ message: "Cart saved successfully!" });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ message: "Failed to save cart", error: error.message });
  }
});

router.get("/cart", authenticateToken, async (req, res) => {
  try {
    // ❌ REMOVE populate() because there's no Product model
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", items: [] });
    }

    res.status(200).json(cart); // ✅ Send cart data without populating
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
});


// Delete an item from the cart
router.delete("/cart/:productId", authenticateToken, async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error("Error removing item:", error.message);
    res.status(500).json({ message: "Failed to remove item", error: error.message });
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
      username: user.username, // Make sure `username` exists in your User model
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Attach Routes
app.use('/api/auth', router);

// -------------------- Server Setup --------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
