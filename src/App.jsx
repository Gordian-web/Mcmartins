import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from "./cart/cartcontext";
import Layout from './component/Layout';
import HomePage from './component/HomePage';
import About from './component/About';
import Cart from './cart/cart';
import CheckoutForm from './cart/proceed';
import Gallery from './component/Gallery';
import Read from './component/read';
import Contact from './component/contact';
import Signin from './component/context/signin';
import Login from './component/context/login';
import Logout from './component/context/logout';
import Notfound from './component/Notfound';
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
  const [authMode, setAuthMode] = useState('signin');
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication check - SIMPLIFIED
  useEffect(() => {
    const token = localStorage.getItem('mcm_auth_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
    
    // If no token and not on auth page, show sign-in
    if (!token && !['/login', '/signin'].includes(location.pathname)) {
      navigate('/signin', { replace: true });
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

  // If not authenticated, show auth pages
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
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default AppWrapper;