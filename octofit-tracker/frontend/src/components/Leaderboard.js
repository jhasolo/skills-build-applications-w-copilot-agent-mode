import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching Leaderboard from:', `${API_URL}leaderboard/`);
        const response = await fetch(`${API_URL}leaderboard/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Leaderboard API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Leaderboard Data:', leaderboardData);
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '⭐';
    }
  };

  const getRankBadgeClass = (rank) => {
    switch (rank) {
      case 1:
        return 'badge-warning';
      case 2:
        return 'badge-secondary';
      case 3:
        return 'badge-danger';
      default:
        return 'badge-primary';
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
          <h2 className="mb-0">🏅 Competitive Leaderboard</h2>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <h4>Leaderboard is empty</h4>
              <p className="text-muted">Start logging activities to see the competitive rankings.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Team</th>
                    <th>Points</th>
                    <th>Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id} className={rank <= 3 ? 'table-light' : ''}>
                        <td>
                          <span className={`badge ${getRankBadgeClass(rank)}`}>
                            {getMedalEmoji(rank)} #{rank}
                          </span>
                        </td>
                        <td>
                          <strong>{entry.user}</strong>
                        </td>
                        <td>
                          <span className="badge badge-info">{entry.team}</span>
                        </td>
                        <td>
                          <strong className="text-primary">{entry.points}</strong>
                        </td>
                        <td>
                          <span className="badge badge-success">{entry.activities_count}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
