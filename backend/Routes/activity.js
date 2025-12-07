const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ActivityLog = require('../models/ActivityLog');



// GET /api/activity → logs for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
