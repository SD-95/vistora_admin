import React, { useState } from 'react';
import {
    Card,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';

const Teammanagementsettings: React.FC = () => {
    const [settings, setSettings] = useState({
        allowSelfRegistration: false,
        defaultRole: 'team',
        roleAssignmentAllowed: true,
        maxTeamSize: 50,
        enableRoleChange: true,
        enforceEmailVerification: true,
        restrictOutsideDomain: false,
        allowedDomains: '',
        sendWelcomeEmail: true
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const updatedValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;

        setSettings(prev => ({
            ...prev,
            [name]: updatedValue
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved Team Management Settings:', settings);
    };

    return (
        <Card className="p-4">
            <h4 className="settings-title">👥 Team Management Settings</h4>
            <p className="settings-description">
                Configure how users join and interact with your team, roles, and member policies.
            </p>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Check
                            type="switch"
                            name="allowSelfRegistration"
                            label="Allow Team Members to Self-Register"
                            checked={settings.allowSelfRegistration}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Default Role on Invite</Form.Label>
                            <Form.Select
                                name="defaultRole"
                                value={settings.defaultRole}
                                onChange={handleChange}
                            >
                                <option value="team">Team</option>
                                <option value="admin">Admin</option>
                                <option value="serviceexecutive">Service Executive</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Check
                            type="switch"
                            name="roleAssignmentAllowed"
                            label="Allow Admins to Change Roles After Joining"
                            checked={settings.roleAssignmentAllowed}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Check
                            type="switch"
                            name="enableRoleChange"
                            label="Allow Role Change for Existing Users"
                            checked={settings.enableRoleChange}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Maximum Allowed Team Size</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxTeamSize"
                                min={1}
                                value={settings.maxTeamSize}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Check
                            type="switch"
                            name="enforceEmailVerification"
                            label="Enforce Email Verification on Registration"
                            checked={settings.enforceEmailVerification}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Check
                            type="switch"
                            name="restrictOutsideDomain"
                            label="Restrict Team Members to Specific Email Domain(s)"
                            checked={settings.restrictOutsideDomain}
                            onChange={handleChange}
                        />
                    </Col>
                    {settings.restrictOutsideDomain && (
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Allowed Domains (comma separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="allowedDomains"
                                    placeholder="example.com, mycompany.org"
                                    value={settings.allowedDomains}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    )}
                </Row>

                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Check
                            type="switch"
                            name="sendWelcomeEmail"
                            label="Send Welcome Email on Invite"
                            checked={settings.sendWelcomeEmail}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Button type="submit" variant="custom">
                    Save Team Management Settings
                </Button>
            </Form>
        </Card>
    );
};

export default Teammanagementsettings;
