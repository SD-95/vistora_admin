// components/settings/CustomerSettings.tsx
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Customersetting: React.FC = () => {
  const [settings, setSettings] = useState({
    allowGuestCheckout: true,
    enableCustomerGroups: false,
    defaultCustomerStatus: 'active',
    autoApproveAccounts: true,
    sendWelcomeEmail: true,
    customerTagging: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer Settings Saved:', settings);
    // send to API later
  };

  return (
    <Card>
      <Card.Body>
         <h4 className="settings-title">👥 Customer Settings</h4>
        <p className="settings-description">Manage preferences related to customer behavior and experience.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Check
            type="switch"
            id="allowGuestCheckout"
            name="allowGuestCheckout"
            label="Allow Guest Checkout"
            checked={settings.allowGuestCheckout}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Check
            type="switch"
            id="enableCustomerGroups"
            name="enableCustomerGroups"
            label="Enable Customer Grouping"
            checked={settings.enableCustomerGroups}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Group className="mb-3">
            <Form.Label>Default Customer Status</Form.Label>
            <Form.Select
              name="defaultCustomerStatus"
              value={settings.defaultCustomerStatus}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          <Form.Check
            type="switch"
            id="autoApproveAccounts"
            name="autoApproveAccounts"
            label="Auto-Approve New Accounts"
            checked={settings.autoApproveAccounts}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Check
            type="switch"
            id="sendWelcomeEmail"
            name="sendWelcomeEmail"
            label="Send Welcome Email on Signup"
            checked={settings.sendWelcomeEmail}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Group className="mb-4">
            <Form.Label>Customer Tagging (optional)</Form.Label>
            <Form.Control
              type="text"
              name="customerTagging"
              placeholder="e.g., VIP, Frequent, New"
              value={settings.customerTagging}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="custom" type="submit">
            Save Settings
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Customersetting;
