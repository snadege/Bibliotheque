import axios from 'axios';

// Utilise la variable d'environnement si disponible, sinon l'URL de Render par défaut
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://bibliotheque-mp44.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur : Ajoute le token Sanctum s'il existe
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;