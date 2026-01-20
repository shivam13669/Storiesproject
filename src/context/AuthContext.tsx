import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  email: string;
  fullName: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, fullName: string, password: string, phone?: string) => Promise<User>;
  adminLogin: (email: string, password: string) => Promise<User>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAdmin(storedIsAdmin);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const { apiClient } = await import('../lib/api');
    const response = await apiClient.auth.login(email, password);
    const userData = response.user;
    
    setToken(response.token);
    setUser(userData);
    setIsAdmin(false);
    
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('authUser', JSON.stringify(userData));
    localStorage.setItem('isAdmin', 'false');
    
    return userData;
  };

  const signup = async (email: string, fullName: string, password: string, phone?: string): Promise<User> => {
    const { apiClient } = await import('../lib/api');
    const response = await apiClient.auth.signup(email, fullName, password, phone);
    const userData = response.user;
    
    setToken(response.token);
    setUser(userData);
    setIsAdmin(false);
    
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('authUser', JSON.stringify(userData));
    localStorage.setItem('isAdmin', 'false');
    
    return userData;
  };

  const adminLogin = async (email: string, password: string): Promise<User> => {
    const { apiClient } = await import('../lib/api');
    const response = await apiClient.auth.adminLogin(email, password);
    const adminData = response.user;
    
    setToken(response.token);
    setUser(adminData);
    setIsAdmin(true);
    
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('authUser', JSON.stringify(adminData));
    localStorage.setItem('isAdmin', 'true');
    
    return adminData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('isAdmin');
  };

  const value: AuthContextType = {
    user,
    token,
    isAdmin,
    isLoading,
    login,
    signup,
    adminLogin,
    logout,
    setUser,
    setToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
