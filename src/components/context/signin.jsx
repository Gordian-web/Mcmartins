import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup({ onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsAuthenticated(true), 100);
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password || !name) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Store user data
      const userData = { email, name };
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      // Store credentials for login
      localStorage.setItem('temp_credentials', JSON.stringify({ email, password }));
      
      // Set authentication token
      localStorage.setItem('mcm_auth_token', 'authenticated');
      
      // Trigger success
      onSuccess({ email, name, token: 'authenticated' });
      navigate('/', { replace: true });
    } catch (err) {
      setError('Signup failed. Please try again.');
      onError('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 transition-transform duration-1000 ease-out  ${isAuthenticated ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}  bg-white rounded-lg shadow-md mt-10`}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to MCM Fashion House</h1>
        <p className="text-gray-600 mt-2">Create your exclusive account</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            placeholder="Your Name"
            required
          />
        </div>
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
          className={`w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors ${isLoading ? 'opacity-75' : ''}`}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
    </div>
  );
}