import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';

const Integrationssetting: React.FC = () => {
  const [integrationSettings, setIntegrationSettings] = useState({
    slackEnabled: false,
    slackWebhookUrl: '',
    zapierEnabled: false,
    googleConnected: false,
    googleAccount: '',
    webhookUrl: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    const updatedValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value;

    setIntegrationSettings((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saved integration settings:', integrationSettings);
    // Later: Call API or trigger save logic
  };

  return (
    <div className="settings-card">
      <h4 className="settings-title">🔗 Integrations</h4>
      <p className="settings-description">
        Configure your external service connections and automation tools.
      </p>

      <Form onSubmit={handleSubmit}>
        {/* Slack Integration */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Slack</h5>
            <Form.Check
              type="switch"
              label="Enable Slack Integration"
              name="slackEnabled"
              checked={integrationSettings.slackEnabled}
              onChange={handleChange}
            />
            {integrationSettings.slackEnabled && (
              <Form.Group className="mt-3">
                <Form.Label>Slack Webhook URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://hooks.slack.com/services/..."
                  name="slackWebhookUrl"
                  value={integrationSettings.slackWebhookUrl}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
          </Card.Body>
        </Card>

        {/* Zapier Integration */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Zapier</h5>
            <Form.Check
              type="switch"
              label="Enable Zapier Integration"
              name="zapierEnabled"
              checked={integrationSettings.zapierEnabled}
              onChange={handleChange}
            />
            <p className="text-muted small mt-2">
              Automate workflows with over 3000+ apps using Zapier. Learn more at{' '}
              <a href="https://zapier.com" target="_blank" rel="noreferrer">
                zapier.com
              </a>.
            </p>
          </Card.Body>
        </Card>

        {/* Google Workspace */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Google Workspace</h5>
            <Form.Check
              type="switch"
              label="Connect Google Account"
              name="googleConnected"
              checked={integrationSettings.googleConnected}
              onChange={handleChange}
            />
            {integrationSettings.googleConnected && (
              <Form.Group className="mt-3">
                <Form.Label>Connected Account Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="user@example.com"
                  name="googleAccount"
                  value={integrationSettings.googleAccount}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
          </Card.Body>
        </Card>

        {/* Webhooks */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Webhooks</h5>
            <Form.Group>
              <Form.Label>Webhook URL</Form.Label>
              <InputGroup>
                <Form.Control
                  type="url"
                  name="webhookUrl"
                  value={integrationSettings.webhookUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/webhook"
                />
              </InputGroup>
              <Form.Text className="text-muted">
                This URL will be triggered on important system events.
              </Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>

        <Button type="submit" variant="custom">
          Save Integration Settings
        </Button>
      </Form>
    </div>
  );
};

export default Integrationssetting;
