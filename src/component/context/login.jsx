import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsAuthenticated(true), 100);
  }, []);

  useEffect(() => {
    // Pre-fill email if user data exists
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const { email } = JSON.parse(userData);
      setEmail(email);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Check against stored credentials
    const tempCredentials = localStorage.getItem('temp_credentials');
    const userData = localStorage.getItem('user_data');
    
    if (tempCredentials && userData) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(tempCredentials);
      const { email: userEmail } = JSON.parse(userData);
      
      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem('mcm_auth_token', 'authenticated');
        onSuccess({ email: userEmail }); // Pass user data to onSuccess
        navigate('/', { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('No account found. Please sign up first.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-10` + ` transition-transform duration-1000 ease-out ${isAuthenticated ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">MCM Member Login</h1>
        <p className="text-gray-600 mt-2">Access your exclusive fashion account</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" 
            placeholder="your@email.com" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" 
            placeholder="••••••••" 
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-black text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-800 ${isLoading ? 'opacity-75' : ''}`}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <a href="/signin" className="font-medium text-black hover:underline">
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  );
}