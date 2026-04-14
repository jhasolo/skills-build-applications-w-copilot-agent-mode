import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching Workouts from:', `${API_URL}workouts/`);
        const response = await fetch(`${API_URL}workouts/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Workouts API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Workouts Data:', workoutsData);
        setWorkouts(workoutsData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getIntensityBadgeClass = (intensity) => {
    switch (intensity?.toLowerCase()) {
      case 'high':
        return 'badge-danger';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-info';
      default:
        return 'badge-secondary';
    }
  };

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
          <h2 className="mb-0">💪 Workouts Tracking</h2>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏋️</div>
              <h4>No workouts found</h4>
              <p className="text-muted">Start logging your workouts to see them here.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Workout Type</th>
                    <th>Duration (min)</th>
                    <th>Intensity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td>
                        <span className="badge badge-primary">{workout.id}</span>
                      </td>
                      <td>{workout.user}</td>
                      <td>
                        <span className="badge badge-success">{workout.workout_type}</span>
                      </td>
                      <td>{workout.duration_minutes}</td>
                      <td>
                        <span className={`badge ${getIntensityBadgeClass(workout.intensity_level)}`}>
                          {workout.intensity_level}
                        </span>
                      </td>
                      <td>{new Date(workout.date).toLocaleDateString()}</td>
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

export default Workouts;
