import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Charger les infos de l'utilisateur au démarrage si un token existe
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Erreur lecture données utilisateur local', e);
      }
    }
    setLoading(false);
  }, [token]);

  // Inscription
  const register = async (name, email, password, passwordConfirmation) => {
    const response = await API.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    const userToken = response.data.access_token || response.data.token;
    const userData = response.data.user;

    if (userToken) {
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(userToken);
      setUser(userData);
    }

    return response.data;
  };

  // Connexion
  const login = async (email, password) => {
    const response = await API.post('/login', { email, password });
    const userToken = response.data.access_token || response.data.token;
    const userData = response.data.user;

    if (userToken) {
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(userToken);
      setUser(userData);
    }

    return response.data;
  };

  // Déconnexion
  const logout = async () => {
    try {
      await API.post('/logout');
    } catch (error) {
      console.error('Erreur déconnexion', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};