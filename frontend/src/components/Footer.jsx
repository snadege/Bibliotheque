import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
      <Container>
        {/* Section Principale */}
        <Row className="gy-4 mb-4">
          {/* Col 1 : Présentation & Contact */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 text-success fw-bold fs-4 mb-3">
              <BookOpen size={28} />
              <span className="text-white">BiblioTech</span>
            </div>
            <p className="text-secondary small pe-lg-3">
              Votre plateforme en ligne de gestion de bibliothèque. Consultez notre catalogue, 
              réservez vos ouvrages et gérez vos emprunts à tout moment.
            </p>
            <div className="d-flex flex-column gap-2 text-secondary small mt-3">
              <div className="d-flex align-items-center gap-2">
                <MapPin size={16} className="text-success flex-shrink-0" />
                <span>Abomey-Calavi, Bénin</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Phone size={16} className="text-success flex-shrink-0" />
                <span>+229 01 66 81 81 32</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={16} className="text-success flex-shrink-0" />
                <span>contact@bibliotech.bj</span>
              </div>
            </div>
          </Col>

          {/* Col 2 : Navigation & Service */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold text-white mb-3 border-start border-success border-3 ps-2">
              Navigation & Service
            </h5>
            <ul className="list-unstyled small mb-4">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-secondary hover-white">
                  → Catalogue complet
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/my-list" className="text-decoration-none text-secondary hover-white">
                  → Mes emprunts
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none text-secondary hover-white">
                  → Espace Connexion
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none text-secondary hover-white">
                  → S'inscrire
                </Link>
              </li>
            </ul>

            <h6 className="fw-bold text-white mb-2 d-flex align-items-center gap-2">
              <Clock size={16} className="text-success" /> Service en ligne
            </h6>
            <div className="text-secondary small">
              <p className="mb-0">Disponible <strong>24h/24 & 7j/7</strong></p>
            </div>
          </Col>

          {/* Col 3 : FAQ Fréquentes */}
          <Col lg={5} md={12}>
            <h5 className="fw-bold text-white mb-3 border-start border-success border-3 ps-2 d-flex align-items-center gap-2">
              <HelpCircle size={18} className="text-success" /> Questions Fréquentes
            </h5>
            
            <Accordion defaultActiveKey="0" flush className="footer-accordion">
              <Accordion.Item eventKey="0" className="bg-transparent border-secondary">
                <Accordion.Header>
                  Comment emprunter un livre ?
                </Accordion.Header>
                <Accordion.Body className="text-secondary small py-2">
                  Connectez-vous à votre compte, recherchez un livre dans le catalogue, puis cliquez sur le bouton <strong className="text-success">Emprunter</strong>.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" className="bg-transparent border-secondary">
                <Accordion.Header>
                  Combien de temps puis-je garder un livre ?
                </Accordion.Header>
                <Accordion.Body className="text-secondary small py-2">
                  La durée standard est de <strong>14 jours</strong>. Vous pouvez consulter l'échéance dans votre espace <strong className="text-success">Mes Emprunts</strong>.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" className="bg-transparent border-secondary">
                <Accordion.Header>
                  Que faire si un livre est indisponible ?
                </Accordion.Header>
                <Accordion.Body className="text-secondary small py-2">
                  Lorsqu'un ouvrage est épuisé, repassez ultérieurement ou contactez l'administration pour vérifier les retours à venir.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        <hr className="border-secondary my-3" />

        {/* Dernières Ligne : Copyright & Réseaux parfaitement alignés */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 pt-2">
          <div className="text-secondary small text-center text-md-start">
            <span>© {new Date().getFullYear()} </span>
            <strong className="text-success fs-6 ms-1">BiblioTech</strong>
            <span className="ms-1"> Projet D-CLIC -Développement Web niveau approfondir - Nadège O. SALAKO - Tous droits réservés.</span>
          </div>

          <div className="d-flex align-items-center gap-3 text-secondary">
            <a href="#facebook" className="text-secondary hover-success" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="#twitter" className="text-secondary hover-success" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="#instagram" className="text-secondary hover-success" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#github" className="text-secondary hover-success" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;