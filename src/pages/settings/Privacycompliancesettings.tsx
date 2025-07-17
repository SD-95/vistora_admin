import React, { useState } from 'react';
import {
    Card,
    Form,
    Button,
    Row,
    Col,
    Alert
} from 'react-bootstrap';

const Privacycompliancesettings: React.FC = () => {
    const [settings, setSettings] = useState({
        gdprCompliant: true,
        dataRetentionPeriod: '180',
        allowDataExport: true,
        allowDataDeletion: false,
        cookieConsentRequired: true,
        enableAuditLogs: true,
        showPrivacyPolicy: true,
        dpaSigned: false
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const target = e.target;
        const { name, type, value } = target;

        const checked = (target as HTMLInputElement).checked;

        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved privacy & compliance settings:', settings);
    };

    return (
        <Card className="p-4">
            <h4 className="settings-title">🛡️ Privacy & Compliance</h4>
            <p className="settings-description">
                Configure policies to comply with data protection laws like GDPR, CCPA, and more.
            </p>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Enable GDPR Compliance"
                        name="gdprCompliant"
                        checked={settings.gdprCompliant}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Data Retention Period (days)</Form.Label>
                            <Form.Control
                                type="number"
                                name="dataRetentionPeriod"
                                value={settings.dataRetentionPeriod}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Allow Users to Export Their Data"
                        name="allowDataExport"
                        checked={settings.allowDataExport}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Allow Users to Request Data Deletion"
                        name="allowDataDeletion"
                        checked={settings.allowDataDeletion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Require Cookie Consent"
                        name="cookieConsentRequired"
                        checked={settings.cookieConsentRequired}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Enable Audit Logs"
                        name="enableAuditLogs"
                        checked={settings.enableAuditLogs}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Show Privacy Policy on Signup"
                        name="showPrivacyPolicy"
                        checked={settings.showPrivacyPolicy}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Check
                        type="switch"
                        label="Data Processing Agreement (DPA) Signed"
                        name="dpaSigned"
                        checked={settings.dpaSigned}
                        onChange={handleChange}
                    />
                </Form.Group>

                {settings.gdprCompliant && (
                    <Alert variant="success">
                        Your platform is configured for GDPR compliance. Review your Data Protection Officer responsibilities and make sure privacy policy and DPA are accessible.
                    </Alert>
                )}

                <Button variant="custom" type="submit">
                    Save Compliance Settings
                </Button>
            </Form>
        </Card>
    );
};

export default Privacycompliancesettings;
