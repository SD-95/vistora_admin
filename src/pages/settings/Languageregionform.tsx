import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface LanguageRegionFormProps {
    initialLanguage?: string;
    initialRegion?: string;
    initialTimezone?: string;
    onSave?: (settings: {
        language: string;
        region: string;
        timezone: string;
    }) => void;
}

const Languageregionform: React.FC<LanguageRegionFormProps> = ({
    initialLanguage = 'English',
    initialRegion = 'India',
    initialTimezone = 'Asia/Kolkata',
    onSave,
}) => {
    const [language, setLanguage] = useState(initialLanguage);
    const [region, setRegion] = useState(initialRegion);
    const [timezone, setTimezone] = useState(initialTimezone);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave?.({ language, region, timezone });
        console.log('Saved Language/Region Settings:', { language, region, timezone });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>🌐 Preferred Language</Form.Label>
                <Form.Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                    <option>Arabic</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>🗺️ Region</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>🕒 Timezone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="e.g. Asia/Kolkata or America/New_York"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                />
            </Form.Group>

            <Button type="submit" variant="custom">Save Preferences</Button>
        </Form>
    );
};

export default Languageregionform;
