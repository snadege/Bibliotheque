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
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  // Connexion
  const login = async (email, password) => {
    const response = await API.post('/login', { email, password });
    const { token: userToken, user: userData } = response.data;

    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(userToken);
    setUser(userData);
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
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};