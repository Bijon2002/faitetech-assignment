const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./Routes/auth');
app.use('/api', authRoutes);

const dashboardRoutes = require('./Routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const profileRoutes = require('./Routes/profile');
app.use('/api/profile', profileRoutes);

const activityRoutes = require('./Routes/activity');
app.use('/api/activity', activityRoutes);

const adminRoutes = require('./Routes/admin');
app.use('/api/admin', adminRoutes);



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Test route
app.get('/', (req, res) => res.send('API running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
