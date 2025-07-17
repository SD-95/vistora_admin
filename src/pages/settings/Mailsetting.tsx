import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Mailsetting: React.FC = () => {
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [signature, setSignature] = useState('');
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
  const [autoReplyMessage, setAutoReplyMessage] = useState('');

  const handleSave = () => {
    console.log({ email, notificationsEnabled, dailyDigest, signature, autoReplyEnabled, autoReplyMessage });
    alert('Mail settings saved successfully!');
  };

  return (
    <div className="settings-card">
      <h4 className="settings-title">📧 Mail Settings</h4>
      <p className="settings-description">
        Configure how you want to receive, reply, and manage your mail notifications and messages.
      </p>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Primary Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Check
          type="switch"
          id="notificationsSwitch"
          label="Enable Email Notifications"
          checked={notificationsEnabled}
          onChange={() => setNotificationsEnabled(!notificationsEnabled)}
        />

        <Form.Check
          type="switch"
          id="dailyDigestSwitch"
          label="Receive Daily Email Digest"
          checked={dailyDigest}
          onChange={() => setDailyDigest(!dailyDigest)}
          className="mt-2"
        />

        <Form.Group className="mt-3" controlId="formSignature">
          <Form.Label>Email Signature</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your email signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </Form.Group>

        <Form.Check
          type="switch"
          id="autoReplySwitch"
          label="Enable Auto-Reply"
          checked={autoReplyEnabled}
          onChange={() => setAutoReplyEnabled(!autoReplyEnabled)}
          className="mt-3"
        />

        {autoReplyEnabled && (
          <Form.Group className="mt-2" controlId="formAutoReplyMessage">
            <Form.Label>Auto-Reply Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your auto-reply message"
              value={autoReplyMessage}
              onChange={(e) => setAutoReplyMessage(e.target.value)}
            />
          </Form.Group>
        )}

        <div className="mt-4">
          <Button variant="custom" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Mailsetting;
