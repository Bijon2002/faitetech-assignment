const ActivityLog = require('../models/ActivityLog');

async function logActivity(userId, action) {
  try {
    const log = new ActivityLog({ user: userId, action });
    await log.save();
  } catch (err) {
    console.error('Activity Log Error:', err.message);
  }
}




module.exports = logActivity;
