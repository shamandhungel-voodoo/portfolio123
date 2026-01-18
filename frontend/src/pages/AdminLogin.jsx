import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Server, RefreshCw } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { authAPI, testConnection } from '../utils/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    setApiUrl(url);
    console.log('Frontend API URL:', url);
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      console.log('Testing connection to:', apiUrl + '/api/health');
      const response = await testConnection();
      console.log('Backend connection test response:', response.data);
      setBackendStatus('connected');
    } catch (error) {
      console.error('Backend connection test error:', error);
      setBackendStatus('disconnected');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (backendStatus !== 'connected') {
      setError('Cannot login: Backend is not connected. Please check if server is running.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      console.log('Sending login request...');
      const response = await authAPI.login(formData.email, formData.password);
      console.log('Login response:', response.data);
      
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminData', JSON.stringify(response.data));
      
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin1@portfolio.com',
      password: 'Admin1234'
    });
    setError('');
  };

  const retryConnection = () => {
    setBackendStatus('checking');
    checkBackendConnection();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyberpunk-dark via-purple-900/20 to-cyberpunk-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-glow bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue 
                          flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="font-orbitron text-2xl">Admin Login</CardTitle>
            <CardDescription className="font-rajdhani">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Connection Status */}
            <div className={`mb-4 p-3 rounded-lg ${backendStatus === 'connected' 
              ? 'bg-green-500/10 border border-green-500/30' 
              : backendStatus === 'disconnected'
              ? 'bg-red-500/10 border border-red-500/30'
              : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Server className={`h-5 w-5 ${backendStatus === 'connected' ? 'text-green-500' :
                    backendStatus === 'disconnected' ? 'text-red-500' : 'text-yellow-500'}`} />
                  <div>
                    <span className="font-rajdhani text-sm">
                      Backend: {backendStatus === 'connected' ? 'Connected ✅' : 
                               backendStatus === 'disconnected' ? 'Disconnected ❌' : 'Checking...'}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {apiUrl}
                    </p>
                  </div>
                </div>
                {backendStatus === 'disconnected' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={retryConnection}
                    className="h-8 px-2"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              {backendStatus === 'disconnected' && (
                <div className="mt-3 text-xs space-y-1">
                  <p className="text-red-500">Backend is not reachable.</p>
                  <p className="text-muted-foreground">1. Ensure backend is running on port 5000</p>
                  <p className="text-muted-foreground">2. Check if URL is correct: {apiUrl}</p>
                  <p className="text-muted-foreground">3. Restart backend: `npm start` in backend folder</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="font-rajdhani font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin1@portfolio.com"
                    required
                    className="pl-10 border-cyberpunk-blue/30 focus:border-cyberpunk-pink"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="font-rajdhani font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-10 border-cyberpunk-blue/30 focus:border-cyberpunk-pink"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                >
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="font-rajdhani text-sm text-red-500">{error}</span>
                  </div>
                </motion.div>
              )}

              <div className="p-4 rounded-lg bg-cyberpunk-blue/10 border border-cyberpunk-blue/30">
                <h4 className="font-orbitron text-sm mb-2 text-cyberpunk-blue">Demo Credentials</h4>
                <div className="font-space text-xs space-y-1">
                  <p className="text-muted-foreground">
                    Email: <span className="text-cyberpunk-pink">admin1@portfolio.com</span>
                  </p>
                  <p className="text-muted-foreground">
                    Password: <span className="text-cyberpunk-pink">Admin1234</span>
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillDemoCredentials}
                  className="w-full mt-3 border-cyberpunk-pink/30 text-cyberpunk-pink hover:bg-cyberpunk-pink/10"
                >
                  Fill Demo Credentials
                </Button>
              </div>

              <Button
                type="submit"
                variant="cyber"
                className="w-full"
                disabled={loading || backendStatus !== 'connected'}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Logging in...
                  </span>
                ) : 'Login to Dashboard'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center font-rajdhani text-sm text-muted-foreground">
              <p>This is a protected area. Unauthorized access is prohibited.</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-cyberpunk-blue hover:text-cyberpunk-pink"
            >
              ← Back to Portfolio
            </Button>
          </CardFooter>
        </Card>

        {/* Debug Info */}
        <div className="mt-6 text-center space-y-2">
          <p className="font-space text-xs text-muted-foreground">
            🔒 Secure JWT Authentication • Encrypted Connection
          </p>
          <div className="font-space text-xs text-cyberpunk-pink/70 space-y-1">
            <p>Backend: {apiUrl}</p>
            <p>Status: {backendStatus}</p>
            <p>Environment: {import.meta.env.MODE}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;