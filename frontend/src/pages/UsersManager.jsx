import { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { Users, Shield, UserCheck, Edit3 } from 'lucide-react';
import API from '../services/api';

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Modal d'édition de rôle
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('user');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get('/admin/users');
      const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setUsers(data);
    } catch (error) {
      console.error('Erreur chargement utilisateurs:', error);
      setMessage({ type: 'danger', text: 'Impossible de charger la liste des utilisateurs.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRoleModal = (user) => {
    setSelectedUser(user);
    setRole(user.role || 'user');
    setShowModal(true);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await API.put(`/admin/users/${selectedUser.id}/role`, { role });
      setMessage({ type: 'success', text: `Rôle de ${selectedUser.name} mis à jour avec succès.` });
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Erreur lors de la modification du rôle.'
      });
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Chargement des comptes utilisateurs...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="bg-success bg-opacity-10 text-success rounded-circle p-3">
          <Users size={28} />
        </div>
        <div>
          <h2 className="fw-bold mb-0">Gestion des Utilisateurs</h2>
          <p className="text-muted mb-0">Consultez la liste des membres et leurs droits d'accès</p>
        </div>
      </div>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      <Card className="border-0 shadow-sm overflow-hidden">
        <Table responsive hover className="align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="py-3 ps-4">Nom complet</th>
              <th className="py-3">Adresse Email</th>
              <th className="py-3">Rôle</th>
              <th className="py-3">Date d'inscription</th>
              <th className="py-3 text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="ps-4 fw-semibold text-dark">{u.name}</td>
                <td className="text-muted">{u.email}</td>
                <td>
                  {u.role === 'admin' ? (
                    <Badge bg="danger" className="d-inline-flex align-items-center gap-1 px-2 py-1">
                      <Shield size={12} /> Administrateur
                    </Badge>
                  ) : (
                    <Badge bg="success" className="d-inline-flex align-items-center gap-1 px-2 py-1">
                      <UserCheck size={12} /> Adhérent
                    </Badge>
                  )}
                </td>
                <td>
                  {u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '-'}
                </td>
                <td className="text-end pe-4">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="d-inline-flex align-items-center gap-1"
                    onClick={() => handleOpenRoleModal(u)}
                  >
                    <Edit3 size={14} /> Modifier rôle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Modal Modifier le Rôle */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleUpdateRole}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Modifier les droits d'accès</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <p className="text-muted mb-3">
              Modifiez le rôle attribué au compte <strong className="text-dark">{selectedUser?.name}</strong> ({selectedUser?.email}).
            </p>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Rôle d'utilisateur</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Adhérent (Utilisateur standard)</option>
                <option value="admin">Administrateur</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="success" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default UsersManager;