import React, { useState } from 'react';
import { Card, Form, Row, Col, Button, ListGroup, Badge } from 'react-bootstrap';

const Automationsettings: React.FC = () => {
  const [formData, setFormData] = useState({
    autoAssignTasks: true,
    autoCloseTickets: false,
    reminderFrequency: '24',
    escalationEnabled: false,
    backupFrequency: 'daily',
    maxLoginAttempts: 5,
    idleTimeout: 15,
    webhookRetries: 3,
    pushNotifications: true,
    enforceAppUpdate: false,
    digestEmails: false,
    recurringReports: true,
    crossPlatformSync: false,
    scheduleDataSync: true,
    downtimeAlerts: false,
    ruleName: '',
    triggerEvent: '',
    actionType: '',
    actionValue: '',
  });

  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'Notify admin on new customer sign-up',
      trigger: 'Customer Sign-Up',
      action: 'Send Email to Admin',
      active: true,
    },
    {
      id: 2,
      name: 'Auto-archive completed orders',
      trigger: 'Order Completed',
      action: 'Archive Order',
      active: false,
    },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === 'checkbox') {
      const checked = (target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Automation settings saved:', formData);
  };

  const handleToggle = (id: number) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const handleAddRule = () => {
    if (formData.ruleName && formData.triggerEvent && formData.actionType) {
      const newRule = {
        id: rules.length + 1,
        name: formData.ruleName,
        trigger: formData.triggerEvent,
        action: `${formData.actionType}: ${formData.actionValue}`,
        active: true,
      };
      setRules([...rules, newRule]);
      setFormData(prev => ({
        ...prev,
        ruleName: '',
        triggerEvent: '',
        actionType: '',
        actionValue: '',
      }));
    }
  };

  return (
    <Card className="p-4">
      <h4 className="settings-title">🤖 Task Automations</h4>
      <p className="settings-description">Configure automated behavior across your platform.</p>

      <Form onSubmit={handleSubmit}>
        {/* Automation Toggles */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Auto-assign new tasks to team"
              name="autoAssignTasks"
              checked={formData.autoAssignTasks}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Auto-close resolved support tickets"
              name="autoCloseTickets"
              checked={formData.autoCloseTickets}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Schedule and Backup Settings */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Reminder Frequency (hours)</Form.Label>
              <Form.Select
                name="reminderFrequency"
                value={formData.reminderFrequency}
                onChange={handleChange}
              >
                <option value="12">Every 12 hours</option>
                <option value="24">Every 24 hours</option>
                <option value="48">Every 2 days</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Enable task escalation if overdue"
              name="escalationEnabled"
              checked={formData.escalationEnabled}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Backup and Security */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Backup Frequency</Form.Label>
              <Form.Select
                name="backupFrequency"
                value={formData.backupFrequency}
                onChange={handleChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Max Login Attempts</Form.Label>
              <Form.Control
                type="number"
                name="maxLoginAttempts"
                value={formData.maxLoginAttempts}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Idle Session Timeout (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="idleTimeout"
                value={formData.idleTimeout}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Webhook Retry Attempts</Form.Label>
              <Form.Control
                type="number"
                name="webhookRetries"
                value={formData.webhookRetries}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Notifications */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Enable push notifications for mobile app"
              name="pushNotifications"
              checked={formData.pushNotifications}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Enforce mobile app update if outdated"
              name="enforceAppUpdate"
              checked={formData.enforceAppUpdate}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Send weekly summary digest emails"
              name="digestEmails"
              checked={formData.digestEmails}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Enable recurring reports generation"
              name="recurringReports"
              checked={formData.recurringReports}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Enable cross-platform data sync"
              name="crossPlatformSync"
              checked={formData.crossPlatformSync}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Schedule auto-sync of data"
              name="scheduleDataSync"
              checked={formData.scheduleDataSync}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Form.Check
          type="switch"
          label="Alert on automation failures or downtime"
          name="downtimeAlerts"
          checked={formData.downtimeAlerts}
          onChange={handleChange}
          className="mb-4"
        />

        <Button type="submit" variant="custom">
          Save Automation Settings
        </Button>
      </Form>

      {/* Automation Rule List */}
      <hr className="my-5" />
      <h5 className="mb-3">Custom Automation Rules</h5>
      <ListGroup className="mb-4">
        {rules.map(rule => (
          <ListGroup.Item
            key={rule.id}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <strong>{rule.name}</strong>
              <br />
              <small>
                Trigger: <Badge bg="secondary">{rule.trigger}</Badge> → Action:{' '}
                <Badge bg="info">{rule.action}</Badge>
              </small>
            </div>
            <Form.Check
              type="switch"
              checked={rule.active}
              onChange={() => handleToggle(rule.id)}
              label={rule.active ? 'On' : 'Off'}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Create Custom Automation Rule */}
      <h5 className="mb-3">Create New Automation Rule</h5>
      <Row className="gy-3">
        <Col md={4}>
          <Form.Control
            type="text"
            name="ruleName"
            placeholder="Automation Name"
            value={formData.ruleName}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            name="triggerEvent"
            value={formData.triggerEvent}
            onChange={handleChange}
          >
            <option value="">Select Trigger</option>
            <option>Customer Sign-Up</option>
            <option>Order Completed</option>
            <option>New Ticket Submitted</option>
            <option>User Inactivity</option>
            <option>Product Low Stock</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            name="actionType"
            value={formData.actionType}
            onChange={handleChange}
          >
            <option value="">Select Action</option>
            <option>Send Email to Admin</option>
            <option>Archive Order</option>
            <option>Create Support Ticket</option>
            <option>Assign Task</option>
            <option>Send Slack Notification</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="gy-3 mt-3">
        <Col md={8}>
          <Form.Control
            type="text"
            name="actionValue"
            placeholder="e.g. admin@company.com or Team A"
            value={formData.actionValue}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Button onClick={handleAddRule} variant="custom" className="w-100">
            ➕ Add Automation Rule
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Automationsettings;
