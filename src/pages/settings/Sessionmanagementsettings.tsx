// SessionManagementSettings.tsx

import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Form,
  Modal,
  Badge
} from 'react-bootstrap';

interface Session {
  id: number;
  ipAddress: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const initialSessions: Session[] = [
  {
    id: 1,
    ipAddress: '192.168.1.20',
    device: 'Chrome on Windows',
    location: 'New Delhi, India',
    lastActive: '5 mins ago',
    isCurrent: true
  },
  {
    id: 2,
    ipAddress: '103.5.114.50',
    device: 'Safari on iPhone',
    location: 'Mumbai, India',
    lastActive: '2 hours ago',
    isCurrent: false
  },
  {
    id: 3,
    ipAddress: '162.10.5.22',
    device: 'Firefox on Mac',
    location: 'Bangalore, India',
    lastActive: '1 day ago',
    isCurrent: false
  }
];

const Sessionmanagementsettings: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [multiDeviceAllowed, setMultiDeviceAllowed] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const revokeSession = (id: number) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const revokeAllOtherSessions = () => {
    setSessions(prev => prev.filter(session => session.isCurrent));
    setShowConfirmModal(false);
  };

  return (
    <Card className="p-4">
      <h4 className="settings-title">📍 Session Management</h4>
      <p className="settings-description">
        Manage active login sessions and enforce policies for account security.
      </p>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          label="Allow Multiple Device Login"
          checked={multiDeviceAllowed}
          onChange={(e) => setMultiDeviceAllowed(e.target.checked)}
        />
      </Form.Group>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Active Sessions</h5>
        <Button variant="outline-danger" onClick={() => setShowConfirmModal(true)}>
          🔐 Revoke All Other Sessions
        </Button>
      </div>

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Device</th>
            <th>Location</th>
            <th>Last Active</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(session => (
            <tr key={session.id}>
              <td>{session.ipAddress}</td>
              <td>{session.device}</td>
              <td>{session.location}</td>
              <td>{session.lastActive}</td>
              <td>
                {session.isCurrent ? (
                  <Badge bg="success">Current</Badge>
                ) : (
                  <Badge bg="secondary">Other</Badge>
                )}
              </td>
              <td>
                {!session.isCurrent && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => revokeSession(session.id)}
                  >
                    Revoke
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h6 className="mt-4">⚙️ Session Policies</h6>
      <ul>
        <li>Session timeout: <strong>30 minutes</strong> of inactivity</li>
        <li>Max concurrent sessions: <strong>{multiDeviceAllowed ? 'Unlimited' : '1'}</strong></li>
        <li>Auto logout when IP changes: <strong>Enabled</strong></li>
      </ul>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Session Revocation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to revoke all other sessions except this one?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={revokeAllOtherSessions}>
            Revoke All
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Sessionmanagementsettings;
