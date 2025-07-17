import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Appearanceform: React.FC = () => {
    const [formData, setFormData] = useState({
        theme: 'light',
        layout: 'fluid',
        sidebarStyle: 'expanded',
        fontSize: 'medium',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved appearance preferences:', formData);
        // TODO: Store preferences in localStorage or send to backend
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Theme */}
            <Form.Group className="mb-3">
                <Form.Label>Theme</Form.Label>
                <Form.Select name="theme" value={formData.theme} onChange={handleChange}>
                    <option value="light">🌞 Light</option>
                    <option value="dark">🌙 Dark</option>
                    <option value="system">🖥️ System Default</option>
                </Form.Select>
            </Form.Group>

            {/* Layout */}
            <Form.Group className="mb-3">
                <Form.Label>Layout Width</Form.Label>
                <Form.Check
                    type="radio"
                    name="layout"
                    value="fluid"
                    label="Fluid (full-width)"
                    checked={formData.layout === 'fluid'}
                    onChange={handleChange}
                />
                <Form.Check
                    type="radio"
                    name="layout"
                    value="boxed"
                    label="Boxed (fixed-width)"
                    checked={formData.layout === 'boxed'}
                    onChange={handleChange}
                />
            </Form.Group>

            {/* Sidebar Style */}
            <Form.Group className="mb-3">
                <Form.Label>Sidebar Style</Form.Label>
                <Form.Check
                    type="radio"
                    name="sidebarStyle"
                    value="expanded"
                    label="Expanded"
                    checked={formData.sidebarStyle === 'expanded'}
                    onChange={handleChange}
                />
                <Form.Check
                    type="radio"
                    name="sidebarStyle"
                    value="collapsed"
                    label="Collapsed"
                    checked={formData.sidebarStyle === 'collapsed'}
                    onChange={handleChange}
                />
            </Form.Group>

            {/* Font Size */}
            <Form.Group className="mb-4">
                <Form.Label>Font Size</Form.Label>
                <Form.Select
                    name="fontSize"
                    value={formData.fontSize}
                    onChange={handleChange}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium (default)</option>
                    <option value="large">Large</option>
                </Form.Select>
            </Form.Group>

            <Button type="submit" variant="custom">
                Save Appearance Settings
            </Button>
        </Form>
    );
};

export default Appearanceform;
