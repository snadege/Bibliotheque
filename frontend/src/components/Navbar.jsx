import { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Bookmark, LogOut, User, Shield, Tag, Users } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top border-bottom">
      <Container>
        {/* Logo / Marque */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold text-success fs-4">
          <BookOpen className="text-success" size={28} />
          <span>BiblioTech</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link as={Link} to="/" className="fw-medium text-dark">
              Catalogue
            </Nav.Link>
            
            {/* Lien Mes Emprunts pour utilisateurs connectés */}
            {user && (
              <Nav.Link as={Link} to="/my-list" className="fw-medium text-dark d-flex align-items-center gap-1">
                <Bookmark size={16} /> Mes Emprunts
              </Nav.Link>
            )}

            {/* Menu Administration (Visible uniquement pour les Admins) */}
            {user && user.role === 'admin' && (
              <NavDropdown title={<span className="fw-semibold text-danger"><Shield size={16} className="me-1" /> Administration</span>} id="admin-dropdown">
                <NavDropdown.Item as={Link} to="/admin" className="d-flex align-items-center gap-2">
                  <BookOpen size={16} /> Tableau de Bord
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/categories" className="d-flex align-items-center gap-2">
                  <Tag size={16} /> Gestion Catégories
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/users" className="d-flex align-items-center gap-2">
                  <Users size={16} /> Gestion Utilisateurs
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {/* Section Profil / Connexion */}
          <Nav className="align-items-center gap-2">
            {user ? (
              <NavDropdown 
                title={
                  <span className="d-inline-flex align-items-center gap-2 fw-medium text-dark bg-light px-3 py-1 rounded-pill border">
                    <User size={16} className="text-success" /> {user.name}
                  </span>
                } 
                id="user-dropdown" 
                align="end"
              >
                <NavDropdown.Header>{user.email}</NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center gap-2">
                  <LogOut size={16} /> Se déconnecter
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" variant="outline-success" className="fw-medium px-3">
                  Se connecter
                </Button>
                <Button as={Link} to="/register" variant="success" className="fw-medium px-3">
                  S'inscrire
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;