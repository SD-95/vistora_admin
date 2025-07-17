import React, { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Badge,
} from 'react-bootstrap';

interface RolePermissions {
  role: string;
  permissions: {
    full_access: boolean;
    can_manage_users: boolean;
    can_manage_orders: boolean;
    can_manage_products: boolean;
    can_manage_finances: boolean;
    can_manage_roles: boolean;
  };
}

const initialRoles: RolePermissions[] = [
  {
    role: 'superadmin',
    permissions: {
      full_access: true,
      can_manage_users: true,
      can_manage_orders: true,
      can_manage_products: true,
      can_manage_finances: true,
      can_manage_roles: true,
    },
  },
  {
    role: 'admin',
    permissions: {
      full_access: false,
      can_manage_users: true,
      can_manage_orders: true,
      can_manage_products: true,
      can_manage_finances: false,
      can_manage_roles: false,
    },
  },
  {
    role: 'team',
    permissions: {
      full_access: false,
      can_manage_users: false,
      can_manage_orders: true,
      can_manage_products: false,
      can_manage_finances: false,
      can_manage_roles: false,
    },
  },
  {
    role: 'serviceexecutive',
    permissions: {
      full_access: false,
      can_manage_users: false,
      can_manage_orders: true,
      can_manage_products: false,
      can_manage_finances: false,
      can_manage_roles: false,
    },
  },
];

const Rolepermission: React.FC = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleToggle = (roleIndex: number, permKey: string) => {
    const updatedRoles = [...roles];
    updatedRoles[roleIndex].permissions[permKey as keyof RolePermissions['permissions']] =
      !updatedRoles[roleIndex].permissions[permKey as keyof RolePermissions['permissions']];
    setRoles(updatedRoles);
  };

  const handleSave = () => {
    console.log('Updated Roles:', roles);
    setEditIndex(null);
  };

  return (
    <Container className="py-5">
      <Card className="shadow p-4">
        <h4 className="fw-bold mb-4">🛠 Manage Roles & Permissions</h4>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>Role</th>
              <th>Full Access</th>
              <th>Manage Users</th>
              <th>Manage Orders</th>
              <th>Manage Products</th>
              <th>Manage Finances</th>
              <th>Manage Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((roleObj, idx) => (
              <tr key={roleObj.role}>
                <td className="text-capitalize">{roleObj.role.replace(/_/g, ' ')}</td>
                {Object.entries(roleObj.permissions).map(([permKey, value]) => (
                  <td key={permKey} className="text-center">
                    {editIndex === idx ? (
                      <Form.Check
                        type="switch"
                        checked={value}
                        onChange={() => handleToggle(idx, permKey)}
                      />
                    ) : (
                      <Badge bg={value ? 'success' : 'secondary'}>{value ? 'Yes' : 'No'}</Badge>
                    )}
                  </td>
                ))}
                <td>
                  {editIndex === idx ? (
                    <Button size="sm" variant="primary" onClick={handleSave}>
                      Save
                    </Button>
                  ) : (
                    <Button size="sm" variant="warning" onClick={() => setEditIndex(idx)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Rolepermission;
