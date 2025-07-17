// RolesPermissionsSettings.tsx

import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';

interface RolePermission {
  role: string;
  can_manage_users: boolean;
  can_manage_orders: boolean;
  can_manage_products: boolean;
  can_manage_finances: boolean;
  can_manage_roles: boolean;
}

const defaultRoles: RolePermission[] = [
  {
    role: 'Superadmin',
    can_manage_users: true,
    can_manage_orders: true,
    can_manage_products: true,
    can_manage_finances: true,
    can_manage_roles: true
  },
  {
    role: 'Admin',
    can_manage_users: true,
    can_manage_orders: true,
    can_manage_products: true,
    can_manage_finances: false,
    can_manage_roles: false
  },
  {
    role: 'Team',
    can_manage_users: false,
    can_manage_orders: true,
    can_manage_products: false,
    can_manage_finances: false,
    can_manage_roles: false
  }
];

const Rolespermissionssettings: React.FC = () => {
  const [roles, setRoles] = useState<RolePermission[]>(defaultRoles);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState<RolePermission>({
    role: '',
    can_manage_users: false,
    can_manage_orders: false,
    can_manage_products: false,
    can_manage_finances: false,
    can_manage_roles: false
  });

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewRole(prev => ({ ...prev, [name]: checked }));
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRole(prev => ({ ...prev, role: e.target.value }));
  };

  const handleAddRole = () => {
    if (newRole.role.trim() !== '') {
      setRoles(prev => [...prev, newRole]);
      setNewRole({
        role: '',
        can_manage_users: false,
        can_manage_orders: false,
        can_manage_products: false,
        can_manage_finances: false,
        can_manage_roles: false
      });
      setShowModal(false);
    }
  };

  return (
    <Card className="p-4">
      <h4 className="settings-title">🧑‍⚖️ Roles & Permissions</h4>
      <p className="settings-description">
        Define access control rules by role. Each role has a set of specific capabilities.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Role List</h5>
        <Button variant="outline-primary" onClick={() => setShowModal(true)}>
          ➕ Add Role
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Role</th>
            <th>Manage Users</th>
            <th>Manage Orders</th>
            <th>Manage Products</th>
            <th>Manage Finances</th>
            <th>Manage Roles</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r, idx) => (
            <tr key={idx}>
              <td>{r.role}</td>
              <td>{r.can_manage_users ? '✅' : '❌'}</td>
              <td>{r.can_manage_orders ? '✅' : '❌'}</td>
              <td>{r.can_manage_products ? '✅' : '❌'}</td>
              <td>{r.can_manage_finances ? '✅' : '❌'}</td>
              <td>{r.can_manage_roles ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Role Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                value={newRole.role}
                onChange={handleText}
                placeholder="Enter role name"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Check
                  label="Can Manage Users"
                  name="can_manage_users"
                  checked={newRole.can_manage_users}
                  onChange={handleCheckbox}
                />
                <Form.Check
                  label="Can Manage Orders"
                  name="can_manage_orders"
                  checked={newRole.can_manage_orders}
                  onChange={handleCheckbox}
                />
                <Form.Check
                  label="Can Manage Products"
                  name="can_manage_products"
                  checked={newRole.can_manage_products}
                  onChange={handleCheckbox}
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  label="Can Manage Finances"
                  name="can_manage_finances"
                  checked={newRole.can_manage_finances}
                  onChange={handleCheckbox}
                />
                <Form.Check
                  label="Can Manage Roles"
                  name="can_manage_roles"
                  checked={newRole.can_manage_roles}
                  onChange={handleCheckbox}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddRole}>
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Rolespermissionssettings;
