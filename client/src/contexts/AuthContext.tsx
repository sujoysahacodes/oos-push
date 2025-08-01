import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  name: string;
  department: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    // Mock token verification for demo deployment
    if (token.startsWith('mock-jwt-token-')) {
      const mockUser: User = {
        id: 1,
        username: 'admin',
        email: 'admin@abi.com',
        role: 'Administrator',
        name: 'Admin User',
        department: 'Supply Chain Management'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    /* Original API-based token verification - commented out for demo deployment
    try {
      const response = await axios.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
    } */
    
    setLoading(false);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication for demo deployment
    const validCredentials = [
      { username: 'admin', password: 'admin123' },
      { username: 'admin', password: 'password123' },
      { username: 'planner', password: 'password123' }
    ];

    const isValid = validCredentials.some(
      cred => cred.username === username && cred.password === password
    );

    if (isValid) {
      const mockUser: User = {
        id: 1,
        username: username,
        email: `${username}@abi.com`,
        role: username === 'admin' ? 'Administrator' : 'Supply Chain Planner',
        name: username === 'admin' ? 'Admin User' : 'Planning User',
        department: 'Supply Chain Management'
      };

      const mockToken = `mock-jwt-token-${Date.now()}`;
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }

    return false;

    /* Original API-based authentication - commented out for demo deployment
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });

      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem('token', token);
        setUser(user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
    */
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
