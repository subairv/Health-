import React, { useState, useEffect } from 'react';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';

const AUTH_KEY = 'isLoggedIn';
const USER_EMAIL_KEY = 'userEmail';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem(AUTH_KEY);
    const storedEmail = localStorage.getItem(USER_EMAIL_KEY);
    if (loggedInStatus === 'true' && storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string) => {
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(USER_EMAIL_KEY, email);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    setIsLoggedIn(false);
    setUserEmail('');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading...</div>;
  }

  return (
    <>
      {isLoggedIn ? <Dashboard onLogout={handleLogout} userEmail={userEmail} /> : <Login onLogin={handleLogin} />}
    </>
  );
};

export default App;