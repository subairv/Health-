import React, { useState, useEffect } from 'react';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';

const AUTH_KEY = 'isLoggedIn';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem(AUTH_KEY);
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string) => {
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading...</div>;
  }

  return (
    <>
      {isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </>
  );
};

export default App;