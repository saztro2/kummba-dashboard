import React, { useState } from 'react';
import LoginPage from './LoginPage';
import DashboardLayout from './DashboardLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <DashboardLayout />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;