
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-white">
            Sign in to VitalTrack AI
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Enter your email to access your health dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-700 bg-slate-900 placeholder-slate-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address (e.g., user@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
         <p className="mt-4 text-xs text-center text-slate-500">
            This is a demo application. No real authentication is performed. Your data is stored locally on your device.
        </p>
      </div>
    </div>
  );
};

export default Login;
