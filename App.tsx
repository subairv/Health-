import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './firebase.ts';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';

// Set to true to bypass Firebase authentication for local development.
// This is a workaround for the `auth/unauthorized-domain` error that can occur
// when the development domain isn't whitelisted in the Firebase project.
const DEV_MODE = true;

const App: React.FC = () => {
  // In DEV_MODE, we create a mock user object and skip the Firebase auth flow.
  // Otherwise, we initialize user to null and let Firebase handle it.
  const [user, setUser] = useState<User | null>(
    DEV_MODE ? ({ displayName: 'Dev User', email: 'dev@example.com' } as User) : null
  );
  // We're not loading if we are in dev mode.
  const [isLoading, setIsLoading] = useState<boolean>(!DEV_MODE);

  useEffect(() => {
    // If in development mode, we don't need to listen for auth state changes.
    if (DEV_MODE) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    if (DEV_MODE) {
      alert("Logout is disabled in development mode.");
      return;
    }
    signOut(auth).catch(error => console.error("Logout failed:", error));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading...</div>;
  }
  
  const userName = user?.displayName || user?.email || 'User';

  return (
    <>
      {user ? <Dashboard onLogout={handleLogout} userName={userName} /> : <Login />}
    </>
  );
};

export default App;