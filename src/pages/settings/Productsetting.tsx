import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

interface ProductSettingsProps {
    onSave?: (settings: ProductSettingsData) => void;
}

interface ProductSettingsData {
    currency: string;
    allowBackorders: boolean;
    lowStockThreshold: number;
    enableStockTracking: boolean;
    showOutOfStock: boolean;
    requireSKU: boolean;
    allowReviews: boolean;
    autoPublishNewProducts: boolean;
}

const ProductsSettings: React.FC<ProductSettingsProps> = ({ onSave }) => {
    const [settings, setSettings] = useState<ProductSettingsData>({
        currency: 'INR',
        allowBackorders: false,
        lowStockThreshold: 5,
        enableStockTracking: true,
        showOutOfStock: true,
        requireSKU: true,
        allowReviews: true,
        autoPublishNewProducts: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setSettings((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setSettings((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved product settings:', settings);
        onSave?.(settings);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Default Currency</Form.Label>
                        <Form.Select name="currency" value={settings.currency} onChange={handleChange}>
                            <option value="INR">₹ INR (Indian Rupee)</option>
                            <option value="USD">$ USD (US Dollar)</option>
                            <option value="EUR">€ EUR (Euro)</option>
                            <option value="GBP">£ GBP (British Pound)</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Low Stock Threshold</Form.Label>
                        <Form.Control
                            type="number"
                            name="lowStockThreshold"
                            min={1}
                            value={settings.lowStockThreshold}
                            onChange={handleChange}
                        />
                        <Form.Text muted>
                            Notify when stock falls below this quantity.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="stock-tracking"
                            label="Enable Stock Tracking"
                            name="enableStockTracking"
                            checked={settings.enableStockTracking}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="show-out-of-stock"
                            label="Show Out of Stock Products"
                            name="showOutOfStock"
                            checked={settings.showOutOfStock}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="require-sku"
                            label="Require SKU for All Products"
                            name="requireSKU"
                            checked={settings.requireSKU}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="allow-reviews"
                            label="Allow Product Reviews"
                            name="allowReviews"
                            checked={settings.allowReviews}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="auto-publish"
                            label="Auto-Publish New Products"
                            name="autoPublishNewProducts"
                            checked={settings.autoPublishNewProducts}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="allow-backorders"
                            label="Allow Backorders When Out of Stock"
                            name="allowBackorders"
                            checked={settings.allowBackorders}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <div className="mt-4">
                <Button type="submit" variant="custom">
                    Save Settings
                </Button>
            </div>
        </Form>
    );
};

export default ProductsSettings;
