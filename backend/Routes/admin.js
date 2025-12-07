const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/admin');
const User = require('../models/User');
const logActivity = require('../utils/activityLogger');

// GET all users (admin only)
router.get('/users', auth, adminCheck, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE a user by ID (admin only)
router.delete('/users/:id', auth, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    await User.findByIdAndDelete(req.params.id);

    // log admin action
    logActivity(req.user.id, `Deleted user ${user.email}`);

    res.json({ msg: 'User deleted successfully' });
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
