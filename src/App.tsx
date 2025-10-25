import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ForgotPassword } from './components/ForgotPassword';
import { AuthenticatedApp } from './components/AuthenticatedApp';

type AuthView = 'login' | 'signup' | 'forgot-password';

function App() {
  const { currentUser } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');

  // Show authenticated app if user is logged in
  if (currentUser) {
    return <AuthenticatedApp />;
  }

  // Show authentication screens
  switch (authView) {
    case 'login':
      return (
        <Login
          onSwitchToSignup={() => setAuthView('signup')}
          onSwitchToForgotPassword={() => setAuthView('forgot-password')}
        />
      );

    case 'signup':
      return <Signup onSwitchToLogin={() => setAuthView('login')} />;

    case 'forgot-password':
      return <ForgotPassword onBack={() => setAuthView('login')} />;

    default:
      return null;
  }
}

export default App;
