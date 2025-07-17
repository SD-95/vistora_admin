import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Preferencesform: React.FC = () => {
    const [formData, setFormData] = useState({
        dashboardView: 'compact',
        language: 'English',
        receiveEmails: true,
        darkMode: false,
        timeFormat: '24h',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved preferences:', formData);
        // TODO: Handle backend sync or save to localStorage
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Dashboard View Preference */}
            <Form.Group className="mb-3">
                <Form.Label>Default Dashboard View</Form.Label>
                <Form.Select
                    name="dashboardView"
                    value={formData.dashboardView}
                    onChange={handleChange}
                >
                    <option value="compact">Compact</option>
                    <option value="detailed">Detailed</option>
                    <option value="grid">Grid</option>
                </Form.Select>
            </Form.Group>

            {/* Language */}
            <Form.Group className="mb-3">
                <Form.Label>Preferred Language</Form.Label>
                <Form.Select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                </Form.Select>
            </Form.Group>

            {/* Time Format */}
            <Form.Group className="mb-3">
                <Form.Label>Time Format</Form.Label>
                <Form.Check
                    inline
                    type="radio"
                    label="12 Hour"
                    name="timeFormat"
                    value="12h"
                    checked={formData.timeFormat === '12h'}
                    onChange={handleChange}
                />
                <Form.Check
                    inline
                    type="radio"
                    label="24 Hour"
                    name="timeFormat"
                    value="24h"
                    checked={formData.timeFormat === '24h'}
                    onChange={handleChange}
                />
            </Form.Group>

            {/* Email Notifications */}
            <Form.Group className="mb-3">
                <Form.Check
                    type="switch"
                    id="receiveEmails"
                    name="receiveEmails"
                    checked={formData.receiveEmails}
                    onChange={handleChange}
                    label="Receive Email Notifications"
                />
            </Form.Group>

            {/* Dark Mode */}
            <Form.Group className="mb-4">
                <Form.Check
                    type="switch"
                    id="darkMode"
                    name="darkMode"
                    checked={formData.darkMode}
                    onChange={handleChange}
                    label="Enable Dark Mode"
                />
            </Form.Group>

            <Button type="submit" variant="custom">
                Save Preferences
            </Button>
        </Form>
    );
};

export default Preferencesform;
