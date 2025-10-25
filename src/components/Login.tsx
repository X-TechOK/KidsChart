import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
}

export function Login({ onSwitchToSignup, onSwitchToForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else {
        setError('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="text-8xl mb-4"
          >
            🎯
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Kids Rewards
          </h1>
          <p className="text-gray-600 text-lg">Welcome back!</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 text-lg"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 text-lg"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
              disabled={loading}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <LogIn className="w-6 h-6" />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-purple-600 hover:text-purple-700 font-bold"
              disabled={loading}
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
