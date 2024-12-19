const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure that the username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that the email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
