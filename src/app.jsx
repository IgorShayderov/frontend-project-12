import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';

import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import LoginPage from './routes/login-page.jsx';
import SignUpPage from './routes/signup-page.jsx';
import Header from './components/header.jsx';
import AuthProvider, { useAuth } from './components/auth-provider.jsx';

import routes from './routes';

const PrivateOutlet = () => {
  const auth = useAuth();

  return auth.currentUser ? <Outlet /> : <Navigate to={routes.loginPath()} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Header />

      <Routes>
        <Route path={routes.loginPath()} element={<LoginPage />} />
        <Route path={routes.signUpPath()} element={<SignUpPage />} />
        <Route path={routes.rootPath()} element={<PrivateOutlet />}>
          <Route path="" element={<Root />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
