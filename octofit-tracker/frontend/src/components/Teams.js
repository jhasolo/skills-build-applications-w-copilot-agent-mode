import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching Teams from:', `${API_URL}teams/`);
        const response = await fetch(`${API_URL}teams/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Teams API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Teams Data:', teamsData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
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
          <h2 className="mb-0">🏆 Teams Management</h2>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h4>No teams found</h4>
              <p className="text-muted">Create a team to get started with team competitions.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td>
                        <span className="badge badge-primary">{team.id}</span>
                      </td>
                      <td>{team.name}</td>
                      <td>
                        <span className="badge badge-success">{team.members ? team.members.length : 0}</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary" title="View details">
                          👁️ View
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
    </div>
  );
}

export default Teams;
