import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  // Pendant le chargement des données utilisateur depuis le localStorage
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  // 1. Si pas connecté -> Redirection vers /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la route nécessite d'être admin et que l'utilisateur ne l'est pas -> Redirection vers l'accueil
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si tout est OK, afficher le composant enfant
  return <Outlet />;
};

export default PrivateRoute;