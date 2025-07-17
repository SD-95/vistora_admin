import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Platformsettings: React.FC = () => {
  const [formData, setFormData] = useState({
    systemName: 'Vistora Platform',
    primaryColor: '#0d6efd',
    accentColor: '#6610f2',
    favicon: '',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'INR',
    locale: 'en-IN',
    debugMode: false,
    apiConsole: false,
    featureFlags: false,
    logLevel: 'info',
    customHeader: '',
    customFooter: '',
    enable2FA: true,
    sessionTimeout: 30,
    restrictIPs: '',
    gdpr: false,
    ccpa: false,
    passwordExpiry: 90,
    dataRetention: 180,
    maxUpload: 10,
    enableBackup: false,
    backupFrequency: 'Weekly',
    archiveUsers: true,
    maintenanceMode: false,
    downtime: '',
    broadcastEnabled: false,
    broadcastMessage: '',
    auditLogging: true,
    theme: 'system',
    fontFamily: 'Inter',
    tableDensity: 'Comfortable',
    animationSpeed: 'Normal',
    showTips: true,
    defaultLanguage: 'English',
    rtlLayout: false,
    countryPicker: true,
    detectLanguage: true,
    slackWebhook: '',
    zapierKey: '',
    gaId: '',
    fbPixel: '',
    sentryDsn: '',
    autoSyncCrm: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted platform config:', formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="scrollbar-dim">
      <h4 className="settings-title">🛠️ Platform Settings</h4>
      <p className="settings-description">Configure how your system behaves across global settings.</p>

      {/* General Settings */}
      <Row className="mb-3">
        <Col md={6}><Form.Group><Form.Label>System Name</Form.Label><Form.Control name="systemName" value={formData.systemName} onChange={handleChange} /></Form.Group></Col>
        <Col md={3}><Form.Group><Form.Label>Primary Brand Color</Form.Label><Form.Control type="color" name="primaryColor" value={formData.primaryColor} onChange={handleChange} /></Form.Group></Col>
        <Col md={3}><Form.Group><Form.Label>Accent Color</Form.Label><Form.Control type="color" name="accentColor" value={formData.accentColor} onChange={handleChange} /></Form.Group></Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}><Form.Group><Form.Label>Date Format</Form.Label><Form.Select name="dateFormat" value={formData.dateFormat} onChange={handleChange}><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></Form.Select></Form.Group></Col>
        <Col md={4}><Form.Group><Form.Label>Time Format</Form.Label><Form.Select name="timeFormat" value={formData.timeFormat} onChange={handleChange}><option value="12h">12-Hour</option><option value="24h">24-Hour</option></Form.Select></Form.Group></Col>
        <Col md={4}><Form.Group><Form.Label>Currency</Form.Label><Form.Select name="currency" value={formData.currency} onChange={handleChange}><option>INR</option><option>USD</option><option>EUR</option></Form.Select></Form.Group></Col>
      </Row>

      {/* Developer Settings */}
      <h5 className="mt-4">🧑‍💻 Developer Settings</h5>
      <Form.Check type="switch" label="Enable Debug Mode" name="debugMode" checked={formData.debugMode} onChange={handleChange} />
      <Form.Check type="switch" label="Show API Console" name="apiConsole" checked={formData.apiConsole} onChange={handleChange} />
      <Form.Check type="switch" label="Enable Feature Flags" name="featureFlags" checked={formData.featureFlags} onChange={handleChange} />
      <Form.Group className="mb-3"><Form.Label>Log Level</Form.Label><Form.Select name="logLevel" value={formData.logLevel} onChange={handleChange}><option>error</option><option>warn</option><option>info</option><option>debug</option><option>trace</option></Form.Select></Form.Group>

      {/* Integration Settings */}
      <h5 className="mt-4">🔗 Integration Settings</h5>
      <Form.Group><Form.Label>Slack Webhook</Form.Label><Form.Control name="slackWebhook" value={formData.slackWebhook} onChange={handleChange} /></Form.Group>
      <Form.Group><Form.Label>Zapier Key</Form.Label><Form.Control name="zapierKey" value={formData.zapierKey} onChange={handleChange} /></Form.Group>
      <Form.Group><Form.Label>Google Analytics ID</Form.Label><Form.Control name="gaId" value={formData.gaId} onChange={handleChange} /></Form.Group>
      <Form.Group><Form.Label>Facebook Pixel ID</Form.Label><Form.Control name="fbPixel" value={formData.fbPixel} onChange={handleChange} /></Form.Group>
      <Form.Group><Form.Label>Sentry DSN</Form.Label><Form.Control name="sentryDsn" value={formData.sentryDsn} onChange={handleChange} /></Form.Group>
      <Form.Check type="switch" label="Auto-sync CRM Data" name="autoSyncCrm" checked={formData.autoSyncCrm} onChange={handleChange} />

      {/* Security & Data */}
      <h5 className="mt-4">🛡️ Security & Compliance</h5>
      <Form.Check type="switch" label="Enable 2FA by Default" name="enable2FA" checked={formData.enable2FA} onChange={handleChange} />
      <Form.Group><Form.Label>Session Timeout (mins)</Form.Label><Form.Control type="number" name="sessionTimeout" value={formData.sessionTimeout} onChange={handleChange} /></Form.Group>
      <Form.Group><Form.Label>Restrict IPs (comma-separated)</Form.Label><Form.Control name="restrictIPs" value={formData.restrictIPs} onChange={handleChange} /></Form.Group>
      <Form.Check type="switch" label="GDPR Mode" name="gdpr" checked={formData.gdpr} onChange={handleChange} />
      <Form.Check type="switch" label="CCPA Mode" name="ccpa" checked={formData.ccpa} onChange={handleChange} />

      {/* Admin Tools */}
      <h5 className="mt-4">💼 Admin Tools</h5>
      <Form.Check type="switch" label="Enable Maintenance Mode" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleChange} />
      <Form.Group><Form.Label>Scheduled Downtime</Form.Label><Form.Control type="datetime-local" name="downtime" value={formData.downtime} onChange={handleChange} /></Form.Group>
      <Form.Check type="switch" label="Broadcast Message Enabled" name="broadcastEnabled" checked={formData.broadcastEnabled} onChange={handleChange} />
      <Form.Group><Form.Label>Broadcast Message</Form.Label><Form.Control name="broadcastMessage" value={formData.broadcastMessage} onChange={handleChange} /></Form.Group>
      <Form.Check type="switch" label="Audit Logging" name="auditLogging" checked={formData.auditLogging} onChange={handleChange} />

      {/* UI & Appearance */}
      <h5 className="mt-4">🎨 Appearance</h5>
      <Form.Group><Form.Label>Admin Theme</Form.Label><Form.Select name="theme" value={formData.theme} onChange={handleChange}><option>Light</option><option>Dark</option><option>System</option></Form.Select></Form.Group>
      <Form.Group><Form.Label>Font Family</Form.Label><Form.Select name="fontFamily" value={formData.fontFamily} onChange={handleChange}><option>Inter</option><option>Roboto</option><option>Open Sans</option></Form.Select></Form.Group>
      <Form.Group><Form.Label>Table Density</Form.Label><Form.Select name="tableDensity" value={formData.tableDensity} onChange={handleChange}><option>Comfortable</option><option>Compact</option></Form.Select></Form.Group>
      <Form.Group><Form.Label>Animation Speed</Form.Label><Form.Select name="animationSpeed" value={formData.animationSpeed} onChange={handleChange}><option>Slow</option><option>Normal</option><option>Fast</option></Form.Select></Form.Group>
      <Form.Check type="switch" label="Show Tips & Onboarding" name="showTips" checked={formData.showTips} onChange={handleChange} />

      {/* Internationalization */}
      <h5 className="mt-4">🌐 Language & Region</h5>
      <Form.Group><Form.Label>Default Language</Form.Label><Form.Select name="defaultLanguage" value={formData.defaultLanguage} onChange={handleChange}><option>English</option><option>Hindi</option><option>Arabic</option><option>French</option></Form.Select></Form.Group>
      <Form.Check type="switch" label="Enable RTL Layout" name="rtlLayout" checked={formData.rtlLayout} onChange={handleChange} />
      <Form.Check type="switch" label="Show Country Picker" name="countryPicker" checked={formData.countryPicker} onChange={handleChange} />
      <Form.Check type="switch" label="Auto-Detect User Language" name="detectLanguage" checked={formData.detectLanguage} onChange={handleChange} />

      <Button type="submit" variant="primary" className="mt-4">Save Settings</Button>
    </Form>
  );
};

export default Platformsettings;
