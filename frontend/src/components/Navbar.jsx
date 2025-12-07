import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

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
      backgroundColor: '#1976d2',
      color: 'white'
    }}>
      <div>
        <Link to="/dashboard" style={{ color: 'white', marginRight: '15px' }}>Dashboard</Link>
        {user && <Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link>}
        {user && <Link to="/activity" style={{ color: 'white', marginRight: '15px' }}>Activity</Link>}
        {user?.role === 'admin' && <Link to="/admin-users" style={{ color: 'white', marginRight: '15px' }}>Admin</Link>}
      </div>
      <div>
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
