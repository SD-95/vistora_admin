import React, { useState } from 'react';
import {
  Card,
  Table,
  Form,
  Badge,
  Button,
  InputGroup,
  Collapse
} from 'react-bootstrap';

interface LoginEntry {
  id: number;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  status: 'Success' | 'Failed';
  user?: string;
  role?: string;
}

const personalLogins: LoginEntry[] = [
  {
    id: 1,
    timestamp: '2025-07-02 08:43:12',
    ipAddress: '192.168.1.10',
    location: 'Delhi, India',
    device: 'Chrome on Windows',
    status: 'Success'
  },
  {
    id: 2,
    timestamp: '2025-07-01 19:15:49',
    ipAddress: '103.45.89.21',
    location: 'Mumbai, India',
    device: 'Safari on iPhone',
    status: 'Failed'
  }
];

const adminLogins: LoginEntry[] = [
  {
    id: 101,
    user: 'Sherman Oberoi',
    role: 'Superadmin',
    timestamp: '2025-07-01 10:02:33',
    ipAddress: '103.225.92.41',
    location: 'Bangalore, India',
    device: 'Firefox on Linux',
    status: 'Success'
  },
  {
    id: 102,
    user: 'Srinidhi Sethi',
    role: 'Admin',
    timestamp: '2025-06-30 16:44:21',
    ipAddress: '192.168.18.14',
    location: 'Chennai, India',
    device: 'Chrome on Windows',
    status: 'Success'
  },
  {
    id: 103,
    user: 'Ashish Jain',
    role: 'Team',
    timestamp: '2025-06-29 12:15:07',
    ipAddress: '10.0.0.13',
    location: 'Hyderabad, India',
    device: 'Edge on Windows',
    status: 'Failed'
  }
];

const Loginhistorysettings: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showAdminLogins, setShowAdminLogins] = useState(true);
  const [logins, setLogins] = useState<LoginEntry[]>(personalLogins);
  const [admins] = useState<LoginEntry[]>(adminLogins);

  const filteredPersonal = logins.filter(
    entry =>
      entry.ipAddress.includes(search) ||
      entry.location.toLowerCase().includes(search.toLowerCase()) ||
      entry.device.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAdmins = admins.filter(
    entry =>
      entry.user?.toLowerCase().includes(search.toLowerCase()) ||
      entry.role?.toLowerCase().includes(search.toLowerCase()) ||
      entry.location.toLowerCase().includes(search.toLowerCase())
  );

  const clearHistory = () => {
    setLogins([]);
  };

  return (
    <Card className="p-4">
      <h4 className="settings-title">📜 Login History</h4>
      <p className="settings-description">
        Track your own login activity and monitor login sessions of the administrative team.
      </p>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search IP, location, device or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-danger" onClick={clearHistory}>
          Clear My History
        </Button>
      </InputGroup>

      <h5 className="mb-3">Your Login Activity</h5>
      <Table bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>IP Address</th>
            <th>Location</th>
            <th>Device</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersonal.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">No personal login records.</td>
            </tr>
          ) : (
            filteredPersonal.map(entry => (
              <tr key={entry.id}>
                <td>{entry.timestamp}</td>
                <td>{entry.ipAddress}</td>
                <td>{entry.location}</td>
                <td>{entry.device}</td>
                <td>
                  <Badge bg={entry.status === 'Success' ? 'success' : 'danger'}>
                    {entry.status}
                  </Badge>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
        <h5>Admin Department Login Activity</h5>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setShowAdminLogins(!showAdminLogins)}
        >
          {showAdminLogins ? 'Hide' : 'Show'} Admin Logins
        </Button>
      </div>

      <Collapse in={showAdminLogins}>
        <div>
          <Table bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Date & Time</th>
                <th>IP</th>
                <th>Location</th>
                <th>Device</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">No admin login records.</td>
                </tr>
              ) : (
                filteredAdmins.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.user}</td>
                    <td>{entry.role}</td>
                    <td>{entry.timestamp}</td>
                    <td>{entry.ipAddress}</td>
                    <td>{entry.location}</td>
                    <td>{entry.device}</td>
                    <td>
                      <Badge bg={entry.status === 'Success' ? 'success' : 'danger'}>
                        {entry.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Collapse>
    </Card>
  );
};

export default Loginhistorysettings;
