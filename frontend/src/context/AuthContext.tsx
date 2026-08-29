import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<string>;
  loginAsDemo: (role: 'PATIENT' | 'DOCTOR') => Promise<string>;
  registerPatient: (data: any) => Promise<void>;
  registerDoctor: (data: any) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('labpulse_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProfile = async () => {
    try {
      const storedToken = localStorage.getItem('labpulse_token');
      if (!storedToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      const res = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setUser(null);
      localStorage.removeItem('labpulse_token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (email: string, pass: string): Promise<string> => {
    const res = await api.post('/auth/login', { email, password: pass });
    const { access_token, role } = res.data;
    localStorage.setItem('labpulse_token', access_token);
    setToken(access_token);
    
    // Fetch profile immediately with the new token
    try {
      const meRes = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setUser(meRes.data);
    } catch (e) {
      console.error('Error loading profile after login:', e);
    }
    
    return role;
  };

  const loginAsDemo = async (role: 'PATIENT' | 'DOCTOR'): Promise<string> => {
    const email = role === 'PATIENT' ? 'patient@labpulse.demo' : 'doctor@labpulse.demo';
    const password = role === 'PATIENT' ? 'PatientDemo123!' : 'DoctorDemo123!';
    return await login(email, password);
  };

  const registerPatient = async (data: any) => {
    const res = await api.post('/auth/register/patient', data);
    const { access_token } = res.data;
    localStorage.setItem('labpulse_token', access_token);
    setToken(access_token);
    await refreshProfile();
  };

  const registerDoctor = async (data: any) => {
    const res = await api.post('/auth/register/doctor', data);
    const { access_token } = res.data;
    localStorage.setItem('labpulse_token', access_token);
    setToken(access_token);
    await refreshProfile();
  };

  const logout = () => {
    localStorage.removeItem('labpulse_token');
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        loginAsDemo,
        registerPatient,
        registerDoctor,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
