import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: darkMode ? '#1e1e1e' : '#1976d2',
      color: 'white'
    }}>
      <div>
        <Link to="/dashboard" style={{ color: 'white', marginRight: '15px' ,textDecoration: 'none'}}>Dashboard</Link>
        {user && <Link to="/profile" style={{ color: 'white', marginRight: '15px',textDecoration: 'none' }}>Profile</Link>}
        {user && <Link to="/activity" style={{ color: 'white', marginRight: '15px',textDecoration: 'none' }}>Activity</Link>}
        {user?.role === 'admin' && <Link to="/admin-users" style={{ color: 'white', marginRight: '15px',textDecoration: 'none' }}>Admin</Link>}
      </div>
      <div>
        <button 
          onClick={toggleTheme} 
          style={{ 
            marginRight: '10px', 
            padding: '5px 10px', 
            cursor: 'pointer',
            backgroundColor: darkMode ? '#333' : '#f0f0f0',
            color: darkMode ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        {user ? (
          <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ color: 'white' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
