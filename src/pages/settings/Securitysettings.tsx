import React, { useState } from 'react';
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Alert
} from 'react-bootstrap';

const Securitysettings: React.FC = () => {
  const [settings, setSettings] = useState({
    passwordChangeInterval: '90',
    twoFactorEnabled: false,
    requireDeviceVerification: true,
    alertOnSuspiciousActivity: true,
    loginNotification: true,
    sessionTimeout: '30',
    ipRestrictions: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Security settings saved:', settings);
  };

  return (
    <Card className="p-4">
      <h4 className="settings-title">🔐 Security Settings</h4>
      <p className="settings-description">
        Manage your platform's security policies to ensure safe access, authentication, and activity.
      </p>

      <Form onSubmit={handleSubmit}>
        {/* Password Policy */}
        <h5 className="mb-3">Password Policy</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Password Expiration (days)</Form.Label>
              <Form.Select
                name="passwordChangeInterval"
                value={settings.passwordChangeInterval}
                onChange={handleChange}
              >
                <option value="30">Every 30 days</option>
                <option value="60">Every 60 days</option>
                <option value="90">Every 90 days</option>
                <option value="never">Never</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* 2FA */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="twoFactorEnabled"
            label="Enable Two-Factor Authentication (2FA)"
            checked={settings.twoFactorEnabled}
            onChange={handleChange}
          />
          {settings.twoFactorEnabled && (
            <Alert variant="info" className="mt-2">
              Users will be required to enter a code sent to their email or mobile device.
            </Alert>
          )}
        </Form.Group>

        {/* Device Verification */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="requireDeviceVerification"
            label="Require New Device Verification"
            checked={settings.requireDeviceVerification}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Suspicious Activity Alerts */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="alertOnSuspiciousActivity"
            label="Alert on Suspicious Login or Location Change"
            checked={settings.alertOnSuspiciousActivity}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Login Notifications */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="loginNotification"
            label="Send Notification on Every Login"
            checked={settings.loginNotification}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Session Timeout */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Session Timeout (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* IP Whitelisting */}
        <Form.Group className="mb-4">
          <Form.Label>Allowed IP Addresses (comma-separated)</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="ipRestrictions"
            value={settings.ipRestrictions}
            onChange={handleChange}
            placeholder="e.g., 192.168.1.1, 203.0.113.7"
          />
        </Form.Group>

        <Button variant="custom" type="submit">
          Save Security Settings
        </Button>
      </Form>

      {/* Active security features summary */}
      <h5 className="mt-5">Active Security Features</h5>
      <ListGroup>
        {settings.twoFactorEnabled && <ListGroup.Item>🔐 Two-Factor Authentication is enabled</ListGroup.Item>}
        {settings.requireDeviceVerification && <ListGroup.Item>📱 Device verification is active</ListGroup.Item>}
        {settings.alertOnSuspiciousActivity && <ListGroup.Item>🚨 Suspicious activity alerts are turned on</ListGroup.Item>}
        {settings.loginNotification && <ListGroup.Item>📩 Login notifications will be sent to users</ListGroup.Item>}
        {settings.sessionTimeout && (
          <ListGroup.Item>⏱️ Session will timeout after {settings.sessionTimeout} minutes</ListGroup.Item>
        )}
        {settings.ipRestrictions && (
          <ListGroup.Item>📍 IP restricted access: {settings.ipRestrictions}</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default Securitysettings;
