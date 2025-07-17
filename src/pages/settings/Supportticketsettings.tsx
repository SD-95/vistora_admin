import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Supportticketsettings: React.FC = () => {
  const [settings, setSettings] = useState({
    enableTicketSystem: true,
    autoAssignTickets: true,
    allowFileAttachments: true,
    ticketPriorityOptions: 'Low, Medium, High, Urgent',
    notifyOnNewTicket: true,
    notifyOnStatusChange: true,
    defaultResponseTime: '24 hours',
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
    console.log('Support ticket settings saved:', settings);
    // API call placeholder
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="settings-title">🎫 Support Ticket Settings</h4>
        <p className="settings-description">Manage how your support ticket system works and behaves.</p>

        <Form onSubmit={handleSubmit}>
          <Form.Check
            type="switch"
            id="enableTicketSystem"
            name="enableTicketSystem"
            label="Enable Ticket System"
            checked={settings.enableTicketSystem}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Check
            type="switch"
            id="autoAssignTickets"
            name="autoAssignTickets"
            label="Auto Assign Tickets to Agents"
            checked={settings.autoAssignTickets}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Check
            type="switch"
            id="allowFileAttachments"
            name="allowFileAttachments"
            label="Allow File Attachments"
            checked={settings.allowFileAttachments}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Group className="mb-3">
            <Form.Label>Ticket Priority Options (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="ticketPriorityOptions"
              value={settings.ticketPriorityOptions}
              onChange={handleChange}
              placeholder="e.g. Low, Medium, High, Urgent"
            />
          </Form.Group>

          <Form.Check
            type="switch"
            id="notifyOnNewTicket"
            name="notifyOnNewTicket"
            label="Notify Agent on New Ticket"
            checked={settings.notifyOnNewTicket}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Check
            type="switch"
            id="notifyOnStatusChange"
            name="notifyOnStatusChange"
            label="Notify Customer on Ticket Status Change"
            checked={settings.notifyOnStatusChange}
            onChange={handleChange}
            className="mb-3"
          />

          <Form.Group className="mb-4">
            <Form.Label>Default Expected Response Time</Form.Label>
            <Form.Control
              type="text"
              name="defaultResponseTime"
              value={settings.defaultResponseTime}
              onChange={handleChange}
              placeholder="e.g. 24 hours"
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

export default Supportticketsettings;
