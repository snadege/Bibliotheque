import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, BookOpen, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, passwordConfirmation);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.'
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
                <h3 className="fw-bold text-dark">Inscription</h3>
                <p className="text-muted small">Créez votre compte pour emprunter des livres</p>
              </div>

              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Nom d'utilisateur */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="fw-medium">Nom complet</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <User size={18} className="text-muted" />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Jean Dupont"
                      className="border-start-0"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                {/* Email */}
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

                {/* Mot de passe */}
                <Form.Group className="mb-3" controlId="formPassword">
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

                {/* Confirmation mot de passe */}
                <Form.Group className="mb-4" controlId="formPasswordConfirmation">
                  <Form.Label className="fw-medium">Confirmer le mot de passe</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Lock size={18} className="text-muted" />
                    </span>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="border-start-0 border-end-0"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
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

                {/* Bouton de Validation Vert */}
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
                      <UserPlus size={18} /> S'inscrire
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted small mb-0">
                  Vous avez déjà un compte ?{' '}
                  <Link to="/login" className="text-success fw-bold text-decoration-none">
                    Se connecter
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

export default Register;