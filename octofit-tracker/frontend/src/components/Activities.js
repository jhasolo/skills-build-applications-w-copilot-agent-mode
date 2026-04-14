import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching Activities from:', `${API_URL}activities/`);
        const response = await fetch(`${API_URL}activities/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Activities API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Activities Data:', activitiesData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">🏃 Activities Tracking</h2>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h4>No activities found</h4>
              <p className="text-muted">Start logging your fitness activities to see them here.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Activity Type</th>
                    <th>Duration (min)</th>
                    <th>Calories</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>
                        <span className="badge badge-primary">{activity.id}</span>
                      </td>
                      <td>{activity.user}</td>
                      <td>
                        <span className="badge badge-success">{activity.activity_type}</span>
                      </td>
                      <td>{activity.duration_minutes}</td>
                      <td><strong>{activity.calories_burned}</strong></td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
