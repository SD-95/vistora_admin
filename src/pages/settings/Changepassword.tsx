import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Changepasswordform: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'danger', text: 'New password and confirmation do not match.' });
      return;
    }

    // TODO: Add actual password update logic here (e.g., API call)
    setMessage({ type: 'success', text: 'Password changed successfully!' });
  };

  return (
    <Form onSubmit={handleSubmit}>

      {message && (
        <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
          {message.text}
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="currentPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          name="currentPassword"
          placeholder="Enter current password"
          value={formData.currentPassword}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="newPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="confirmPassword">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="custom">
        Update Password
      </Button>
    </Form>
  );
};

export default Changepasswordform;
