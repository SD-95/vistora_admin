import React, { useState } from 'react';
import { Card, Table, Form, Row, Col, InputGroup } from 'react-bootstrap';

interface AuditLog {
  id: number;
  user: string;
  role: string;
  action: string;
  module: string;
  timestamp: string;
  ip: string;
}

const sampleLogs: AuditLog[] = [
  {
    id: 1,
    user: 'Sherman Oberoi',
    role: 'Superadmin',
    action: 'Updated security settings',
    module: 'Security',
    timestamp: '2025-07-02 14:30:45',
    ip: '192.168.0.21',
  },
  {
    id: 2,
    user: 'Srinidhi Sethi',
    role: 'Admin',
    action: 'Created new automation rule',
    module: 'Automation',
    timestamp: '2025-07-02 10:18:30',
    ip: '192.168.0.42',
  },
  {
    id: 3,
    user: 'Ashish Jain',
    role: 'Team',
    action: 'Logged in',
    module: 'Authentication',
    timestamp: '2025-07-01 09:12:10',
    ip: '192.168.0.34',
  },
];

const Auditlogsettings: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredLogs = sampleLogs.filter(log => {
    const matchesRole = roleFilter === 'all' || log.role.toLowerCase() === roleFilter;
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.module.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <Card className="p-4">
      <h4 className="settings-title">🧾 Audit Logs</h4>
      <p className="settings-description">
        View all platform activity and administrative actions for compliance and transparency.
      </p>

      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search user, action or module"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="superadmin">Superadmin</option>
            <option value="admin">Admin</option>
            <option value="team">Team</option>
            <option value="serviceexecutive">Service Executive</option>
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Role</th>
            <th>Action</th>
            <th>Module</th>
            <th>Timestamp</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={log.id}>
              <td>{index + 1}</td>
              <td>{log.user}</td>
              <td>{log.role}</td>
              <td>{log.action}</td>
              <td>{log.module}</td>
              <td>{log.timestamp}</td>
              <td>{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default Auditlogsettings;
