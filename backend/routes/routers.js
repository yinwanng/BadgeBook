const express = require('express');
const router = express.Router();
const Profile = require('../public/models/profileModel');

// Routing

router.get('/api/1.0/profiles', function(req, res){
  Profile.find({}, (err, profiles) => {
    res.json(profiles);
  });
});

module.exports = router;
