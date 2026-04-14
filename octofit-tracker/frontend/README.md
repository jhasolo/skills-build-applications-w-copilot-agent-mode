# OctoFit Tracker - React Frontend

A React-based frontend for the OctoFit Tracker fitness application. This frontend connects to the Django REST API backend and provides a user interface for tracking fitness activities, managing teams, and viewing leaderboards.

## Features

- **Users**: View and manage user profiles
- **Activities**: Log and track fitness activities
- **Teams**: Create and manage teams
- **Workouts**: Track workout sessions
- **Leaderboard**: Compete with other users on the leaderboard
- **Responsive Design**: Bootstrap-based responsive UI

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install --prefix octofit-tracker/frontend
   ```

2. Create a `.env` file from `.env.example`:
   ```bash
   cp octofit-tracker/frontend/.env.example octofit-tracker/frontend/.env
   ```

3. Set up environment variables:
   - If running in GitHub Codespaces, set `REACT_APP_CODESPACE_NAME` to your codespace name
   - If running locally, leave it blank (defaults to `http://localhost:8000/api/`)

## Running the Application

### Development Mode

```bash
npm start --prefix octofit-tracker/frontend
```

The app will open at `http://localhost:3000`

### Production Build

```bash
npm run build --prefix octofit-tracker/frontend
```

### Running Tests

```bash
npm test --prefix octofit-tracker/frontend
```

## Environment Variables

The application uses the following environment variables:

- `REACT_APP_CODESPACE_NAME`: The GitHub Codespaces name (if running in Codespaces)
  - When set: API URL = `https://{CODESPACE_NAME}-8000.app.github.dev/api/`
  - When not set: API URL = `http://localhost:8000/api/`

## API Endpoints

The frontend connects to the following Django REST API endpoints:

- `/api/users/` - User management
- `/api/activities/` - Activity tracking
- `/api/teams/` - Team management
- `/api/workouts/` - Workout tracking
- `/api/leaderboard/` - Leaderboard data

## Components

- **App.js**: Main application component with React Router navigation
- **Users.js**: User list and management
- **Activities.js**: Activity tracking and logging
- **Teams.js**: Team management and display
- **Workouts.js**: Workout tracking and display
- **Leaderboard.js**: Competitive leaderboard

## Debugging

All components include `console.log` statements that log:
- The API endpoint being called
- The raw API response
- The processed data

Open your browser's developer console (F12) to see these logs.

## Technologies

- React 18
- React Router DOM 6
- Bootstrap 5
- Fetch API for HTTP requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
