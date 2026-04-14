// Get the API base URL based on environment
const getApiUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/`;
  } else {
    // Fallback to localhost for local development
    return 'http://localhost:8000/api/';
  }
};

export const API_URL = getApiUrl();

console.log('API Base URL:', API_URL);
