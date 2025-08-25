import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from "./cart/cartcontext";
import Layout from './components/layout';
import HomePage from './components/homepage';
import About from './components/About';
import Cart from './cart/cart';
import CheckoutForm from './cart/proceed';
import Gallery from './components/Gallery';
import Read from './components/read';
import Contact from './components/contact';
import Signin from './components/context/signin';
import Login from './components/context/login';
import Logout from './components/context/logout';
import NotFound from './components/notfound';
import './App.css';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('mcm_auth_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);

    // Redirect logic
    if (!token && !['/login', '/signin'].includes(location.pathname)) {
      navigate('/signin', { replace: true });
    } else if (token && ['/login', '/signin'].includes(location.pathname)) {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleAuthSuccess = (authData) => {
    localStorage.setItem('mcm_auth_token', authData.token || 'authenticated');
    setIsAuthenticated(true);
    setAuthError('');
    navigate('/', { replace: true });
  };

  const handleSignOut = () => {
    localStorage.removeItem('mcm_auth_token');
    setIsAuthenticated(false);
    navigate('/signin', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Render authentication pages if not authenticated
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/signin" element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              {authError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {authError}
                </div>
              )}
              <Signin onSuccess={handleAuthSuccess} onError={setAuthError} />
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        } />
        <Route path="/login" element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              {authError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {authError}
                </div>
              )}
              <Login onSuccess={handleAuthSuccess} onError={setAuthError} />
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signin')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        } />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }

  // Authenticated routes
  return (
    <CartProvider>
      <Layout onSignOut={handleSignOut}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/read" element={<Read />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default AppWrapper;