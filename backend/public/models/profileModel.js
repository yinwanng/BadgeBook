const mongoose = require('mongoose');

// User Schema
const ProfileSchema = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
  },
  description: {
      type: String,
  },

});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
