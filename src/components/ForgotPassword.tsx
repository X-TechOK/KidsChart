import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-8xl mb-6"
          >
            📧
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Check Your Email
          </h1>

          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 text-left">
              We've sent password reset instructions to <strong>{email}</strong>.
              Please check your inbox and follow the link to reset your password.
            </p>
          </div>

          <button
            onClick={onBack}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }

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
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-8xl mb-4"
          >
            🔑
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your email to receive reset instructions
          </p>
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            disabled={loading}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
