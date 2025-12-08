import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Dashboard.css'; // modern CSS file

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await api.get('/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.log(err.response);
        setError('Failed to fetch dashboard data.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (error) return <p className="error-text">{error}</p>;
  if (!user) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dash-wrapper">
      {/* Banner Rectangle with Profile Pic centered */}
      <div 
        className="dash-banner" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/banner.jpg)` }}
      >
        <img
          className="profile-pic"
          src={
            user.profilePic
              ? `${process.env.REACT_APP_API_URL}/uploads/${user.profilePic}`
              : '/default.png'
          }
          alt="Profile"
        />
      </div>

      <div className="dash-card">
        <h2 className="dash-title">Welcome, {user.name} 👋</h2>

        <div className="dash-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
