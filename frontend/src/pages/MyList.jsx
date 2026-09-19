import { useState, useEffect, useContext } from 'react';
import { Container, Card, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, RotateCcw, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchMyBorrowings();
  }, []);

  const fetchMyBorrowings = async () => {
    try {
      const response = await API.get('/my-borrowings');
      const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setBorrowings(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des emprunts:', error);
      setMessage({ type: 'danger', text: 'Impossible de charger vos emprunts.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowingId) => {
    setReturningId(borrowingId);
    setMessage({ type: '', text: '' });

    try {
      await API.post(`/borrowings/${borrowingId}/return`);
      setMessage({ type: 'success', text: 'Livre retourné avec succès !' });
      fetchMyBorrowings();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Erreur lors du retour du livre.'
      });
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Chargement de vos emprunts...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="bg-success bg-opacity-10 text-success rounded-circle p-3">
          <Bookmark size={28} />
        </div>
        <div>
          <h2 className="fw-bold mb-0">Mes Emprunts</h2>
          <p className="text-muted mb-0">Consultez et gérez vos livres en cours de lecture</p>
        </div>
      </div>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      {borrowings.length === 0 ? (
        <Card className="text-center p-5 border-0 shadow-sm">
          <Card.Body>
            <AlertCircle size={48} className="text-muted mb-3" />
            <h5 className="fw-bold">Aucun emprunt en cours</h5>
            <p className="text-muted">Vous n'avez pas encore emprunté d'ouvrage dans la bibliothèque.</p>
            <Button as={Link} to="/" variant="success" className="mt-2 d-inline-flex align-items-center gap-2">
              <BookOpen size={16} /> Explorer le catalogue
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm overflow-hidden">
          <Table responsive hover className="align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="py-3 ps-4">Livre</th>
                <th className="py-3">Auteur</th>
                <th className="py-3">Date d'emprunt</th>
                <th className="py-3">Statut</th>
                <th className="py-3 text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.map((item) => (
                <tr key={item.id}>
                  <td className="ps-4 fw-medium text-dark">{item.book?.title || 'Titre inconnu'}</td>
                  <td className="text-muted">{item.book?.author || '-'}</td>
                  <td>{item.borrowed_at ? new Date(item.borrowed_at).toLocaleDateString('fr-FR') : '-'}</td>
                  <td>
                    {item.returned_at ? (
                      <Badge bg="secondary">Retourné</Badge>
                    ) : (
                      <Badge bg="success">En cours</Badge>
                    )}
                  </td>
                  <td className="text-end pe-4">
                    {!item.returned_at && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        disabled={returningId === item.id}
                        onClick={() => handleReturn(item.id)}
                        className="d-inline-flex align-items-center gap-1"
                      >
                        {returningId === item.id ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <>
                            <RotateCcw size={14} /> Retourner
                          </>
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
  );
};

export default MyList;