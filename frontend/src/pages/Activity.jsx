import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Activity.css'; // modern CSS file

function Activity() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await api.get('/api/activity', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLogs(res.data);
      } catch (err) {
        console.log(err.response);
        setError('Failed to fetch activity logs. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [navigate]);

  if (loading) return <p className="loading-text">Loading logs…</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="activity-wrapper">
      <div className="activity-card">
        <h2 className="activity-title">Activity Logs</h2>

        {logs.length === 0 ? (
          <p className="empty-text">No activity logs found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td>
                      {new Date(log.date).toLocaleString('en-GB', {
                        hour12: true,
                      })}
                    </td>
                    <td>{log.action}</td>
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

export default Activity;
