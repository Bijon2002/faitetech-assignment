import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Profile.css'; // modern CSS

function Profile() {
const navigate = useNavigate();

const [user, setUser] = useState({});
const [name, setName] = useState('');
const [dob, setDob] = useState('');
const [profilePic, setProfilePic] = useState(null);
const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
const [message, setMessage] = useState('');
const [error, setError] = useState('');

useEffect(() => {
const storedUser = JSON.parse(localStorage.getItem('user'));
if (!storedUser) navigate('/login');


setUser(storedUser);
setName(storedUser.name || '');
setDob(storedUser.dob ? storedUser.dob.split('T')[0] : '');


}, [navigate]);

const token = localStorage.getItem('token');

// Update Profile
const handleProfileUpdate = async (e) => {
e.preventDefault();
setMessage('');
setError('');


try {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('dob', dob);
  if (profilePic) formData.append('profilePic', profilePic);

  const res = await api.put('/api/profile/update', formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
  });

  setMessage('Profile updated successfully!');
  setUser(res.data.user);
  localStorage.setItem('user', JSON.stringify(res.data.user));

} catch (err) {
  setError(err.response?.data?.msg || 'Profile update failed');
}


};

// Change Password
const handlePasswordChange = async (e) => {
e.preventDefault();
setMessage('');
setError('');

try {
  await api.put(
    '/api/profile/change-password',
    {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setMessage('Password changed successfully!');
  setPasswords({ oldPassword: '', newPassword: '' });

} catch (err) {
  setError(err.response?.data?.msg || 'Password change failed');
}


};

return ( <div className="profile-container"> <h2>My Profile</h2>


  {message && <p className="success-text">{message}</p>}
  {error && <p className="error-text">{error}</p>}

  {/* Profile Picture Centered */}
  <div className="profile-pic-wrapper">
    <img
      className="profile-pic"
      src={
        user.profilePic
          ? `${process.env.REACT_APP_API_URL}/uploads/${user.profilePic}`
          : '/default.png' // default image from public folder
      }
      alt="Profile"
    />
  </div>

  {/* Profile Update */}
  <div className="card">
    <h3>Update Profile</h3>

    <form onSubmit={handleProfileUpdate}>
      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input 
          type="date" 
          value={dob}
          onChange={(e) => setDob(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Profile Picture</label>
        <input 
          type="file"
          onChange={(e) => setProfilePic(e.target.files[0])} 
        />
      </div>

      <button className="btn" type="submit">Save Changes</button>
    </form>
  </div>

  {/* Password Change */}
  <div className="card">
    <h3>Change Password</h3>

    <form onSubmit={handlePasswordChange}>
      <div className="form-group">
        <label>Old Password</label>
        <input 
          type="password"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input 
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          required
        />
      </div>

      <button className="btn" type="submit">Update Password</button>
    </form>
  </div>
</div>


);
}

export default Profile;
