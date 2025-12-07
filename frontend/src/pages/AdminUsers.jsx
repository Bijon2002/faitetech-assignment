import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AdminUsers.css'; // NEW modern CSS file

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || user.role !== 'admin') {
        navigate('/login');
        return;
      }

      try {
        const res = await api.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err.response);
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    setMessage('');
    setError('');

    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('User deleted successfully!');
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err.response);
      setError('Failed to delete user.');
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-card">
        <h2 className="admin-title">Manage Users</h2>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        {users.length === 0 ? (
          <p className="empty-text">No users found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(u._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
