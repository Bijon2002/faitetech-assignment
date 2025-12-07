const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
//const bcrypt = require('bcryptjs');
const logActivity = require('../utils/activityLogger');


// Multer setup for profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder must exist
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Update profile
router.put('/update', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const { name, dob } = req.body;
    if(!name) return res.status(400).json({ msg: 'Name is required' });

    const updateData = { name };
    if(dob) updateData.dob = dob;
    if(req.file) updateData.profilePic = req.file.filename;

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
    res.json({ msg: 'Profile updated successfully', user });

        logActivity(req.user.id, 'Profile updated');


  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const bcrypt = require('bcryptjs');

// Change password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword) return res.status(400).json({ msg: 'All fields required' });

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch) return res.status(400).json({ msg: 'Old password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: 'Password changed successfully' });

    logActivity(req.user.id, 'Password changed');


  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;
