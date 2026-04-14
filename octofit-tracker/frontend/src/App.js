import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  console.log('App component loaded');

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img 
                src={process.env.PUBLIC_URL + '/octofitapp-logo.png'} 
                alt="OctoFit Logo"
                title="OctoFit Tracker"
              />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏆 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏅 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5">
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-3 text-center mb-4 mb-md-0">
                          <img 
                            src={process.env.PUBLIC_URL + '/octofitapp-logo.png'} 
                            alt="OctoFit Logo"
                            style={{
                              maxWidth: '100%',
                              width: '200px',
                              filter: 'drop-shadow(0 4px 8px rgba(0, 123, 255, 0.3))',
                              transition: 'transform 0.3s ease',
                            }}
                            className="logo-home"
                          />
                        </div>
                        <div className="col-md-9">
                          <h1 className="display-4">💪 Welcome to OctoFit Tracker</h1>
                          <p className="lead">
                            Track your fitness journey, build winning teams, and compete on the leaderboard!
                          </p>
                          <hr className="my-4" />
                          <p className="text-muted">
                            OctoFit Tracker is your personal fitness companion. Log your activities, manage teams, and climb the leaderboard to become the ultimate fitness champion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-md-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">👥 Users</h5>
                          <p className="card-text">View and manage user profiles. See all registered users in the system.</p>
                          <Link to="/users" className="btn btn-primary">
                            View Users
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">🏃 Activities</h5>
                          <p className="card-text">Track your daily fitness activities and monitor your progress.</p>
                          <Link to="/activities" className="btn btn-primary">
                            View Activities
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">🏆 Teams</h5>
                          <p className="card-text">Create and manage teams for group competitions and team challenges.</p>
                          <Link to="/teams" className="btn btn-primary">
                            View Teams
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">💪 Workouts</h5>
                          <p className="card-text">Log and track your workout sessions with detailed statistics.</p>
                          <Link to="/workouts" className="btn btn-primary">
                            View Workouts
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">🏅 Leaderboard</h5>
                          <p className="card-text">Compete with other users and climb to the top of the leaderboard!</p>
                          <Link to="/leaderboard" className="btn btn-primary">
                            View Leaderboard
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container">
            <p className="mb-2">
              &copy; 2024 OctoFit Tracker. Fitness Tracking Made Simple.
            </p>
            <p className="text-muted small">
              Track activities • Manage teams • Compete on leaderboard
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
