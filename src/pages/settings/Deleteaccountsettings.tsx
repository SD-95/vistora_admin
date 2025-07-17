import React, { useState } from 'react';
import { Card, Button, Form, Modal, Alert } from 'react-bootstrap';

const Deleteaccountsettings: React.FC = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState('');
    const [acknowledged, setAcknowledged] = useState(false);
    const [error, setError] = useState('');
    const [deletionSuccess, setDeletionSuccess] = useState(false);

    const handleDelete = () => {
        if (!acknowledged) {
            setError('You must confirm the consequences before proceeding.');
            return;
        }

        if (!password) {
            setError('Please enter your password to confirm.');
            return;
        }

        // Simulate deletion logic
        setTimeout(() => {
            setShowConfirm(false);
            setDeletionSuccess(true);
            console.log('Account deleted'); // Replace with actual deletion API
        }, 1000);
    };

    return (
        <Card className="p-4">
            <h4 className="settings-title">🗑️ Delete My Account</h4>
            <p className="settings-description">
                Permanently delete your account and all associated data from the platform.
                This action is <strong>irreversible</strong>.
            </p>

            {deletionSuccess ? (
                <Alert variant="success">
                    Your account has been successfully deleted. You will be logged out shortly.
                </Alert>
            ) : (
                <>
                    <Alert variant="warning">
                        <strong>Warning:</strong> Deleting your account will:
                        <ul>
                            <li>Remove all your personal data and preferences.</li>
                            <li>Disconnect any integrations or devices.</li>
                            <li>Erase your team membership and permissions.</li>
                            <li>Make this action irreversible.</li>
                        </ul>
                    </Alert>

                    <Button variant="danger" onClick={() => setShowConfirm(true)}>
                        ⚠️ Delete My Account
                    </Button>

                    <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Account Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    label="I understand that this action cannot be undone."
                                    checked={acknowledged}
                                    onChange={(e) => setAcknowledged(e.target.checked)}
                                    className="mb-3"
                                />
                                <Form.Group className="mb-3">
                                    <Form.Label>Enter your password to confirm:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Confirm Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </Card>
    );
};

export default Deleteaccountsettings;
