
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.ts';
import { GoogleIcon } from './Icons.tsx';


const Login: React.FC = () => {

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-white">
            Welcome to VitalTrack AI
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Sign in with your Google account to continue
          </p>
        </div>
        <div className="mt-8">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="group relative w-full flex items-center justify-center py-3 px-4 border border-slate-600 text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-all duration-200"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
        </div>
         <p className="mt-6 text-xs text-center text-slate-500">
            Your health data is stored locally on your device and is not shared with Google.
        </p>
      </div>
    </div>
  );
};

export default Login;