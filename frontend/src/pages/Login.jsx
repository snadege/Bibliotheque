import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, BookOpen, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Identifiants invalides ou problème de connexion au serveur.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          {/* Bouton retour vers l'accueil */}
          <div className="mb-3">
            <Link to="/" className="text-decoration-none text-muted d-inline-flex align-items-center gap-1 small fw-medium">
              <ArrowLeft size={16} /> Retour à l'accueil
            </Link>
          </div>

          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mb-2">
                  <BookOpen size={32} />
                </div>
                <h3 className="fw-bold text-dark">Connexion</h3>
                <p className="text-muted small">Accédez à votre espace membre BiblioTech</p>
              </div>

              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Champ Email */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-medium">Adresse Email</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Mail size={18} className="text-muted" />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="nom@exemple.com"
                      className="border-start-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                {/* Champ Mot de passe avec toggle masquage */}
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fw-medium">Mot de passe</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Lock size={18} className="text-muted" />
                    </span>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="border-start-0 border-end-0"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button 
                      variant="outline-secondary" 
                      className="bg-light border-start-0 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </Form.Group>

                {/* Bouton de Soumission Vert */}
                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      <LogIn size={18} /> Se connecter
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted small mb-0">
                  Vous n'avez pas encore de compte ?{' '}
                  <Link to="/register" className="text-success fw-bold text-decoration-none">
                    S'inscrire
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;