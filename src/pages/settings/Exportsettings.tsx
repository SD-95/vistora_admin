import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const Exportsettings: React.FC = () => {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('weekly');
  const [backupLocation, setBackupLocation] = useState('cloud');
  const [lastBackup, setLastBackup] = useState('2025-07-01 02:00 PM');
  const [alert, setAlert] = useState('');

  const handleExport = (type: string) => {
    setAlert(`Exporting ${type}...`);
    setTimeout(() => {
      setAlert(`${type} export completed successfully!`);
    }, 1000);
  };

  const handleBackupNow = () => {
    setAlert('Performing backup...');
    setTimeout(() => {
      setLastBackup(new Date().toLocaleString());
      setAlert('Backup completed successfully!');
    }, 1500);
  };

  return (
    <Card className="p-4">
      <h4 className="settings-title">📤 Data Export & Backup</h4>
      <p className="settings-description">
        Export system data or schedule regular backups to prevent data loss and meet compliance requirements.
      </p>

      {alert && (
        <Alert variant="success" onClose={() => setAlert('')} dismissible>
          {alert}
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={4}>
          <h6>Export Data</h6>
          <Button variant="outline-primary" className="mb-2 w-100" onClick={() => handleExport('User Data')}>
            📁 Export User Data
          </Button>
          <Button variant="outline-primary" className="mb-2 w-100" onClick={() => handleExport('Audit Logs')}>
            🧾 Export Audit Logs
          </Button>
          <Button variant="outline-primary" className="mb-2 w-100" onClick={() => handleExport('Settings')}>
            ⚙️ Export Platform Settings
          </Button>
        </Col>

        <Col md={8}>
          <h6>Backup Settings</h6>
          <Form>
            <Form.Check
              type="switch"
              label="Enable Automatic Backups"
              checked={autoBackupEnabled}
              onChange={(e) => setAutoBackupEnabled(e.target.checked)}
              className="mb-3"
            />

            <Form.Group className="mb-3">
              <Form.Label>Backup Frequency</Form.Label>
              <Form.Select
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Backup Location</Form.Label>
              <Form.Select
                value={backupLocation}
                onChange={(e) => setBackupLocation(e.target.value)}
              >
                <option value="cloud">Cloud Storage (Secure)</option>
                <option value="local">Download to Local System</option>
                <option value="external">External Backup Service</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span><strong>Last Backup:</strong> {lastBackup}</span>
              <Button variant="custom" onClick={handleBackupNow}>🔁 Backup Now</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default Exportsettings;
