import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Billingsetting: React.FC = () => {
  const [billingInfo, setBillingInfo] = useState({
    companyName: '',
    billingEmail: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    taxId: '',
    paymentMethod: 'credit_card',
    autoRenewal: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === 'checkbox') {
      setBillingInfo((prev) => ({
        ...prev,
        [name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setBillingInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Billing info saved:', billingInfo);
    // Perform billing update logic here
  };

  return (
    <div className="settings-card">
      <h4 className="settings-title">💳 Billing</h4>
      <p className="settings-description">
        Manage your billing details, invoices, and payment preferences.
      </p>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={billingInfo.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Billing Email</Form.Label>
              <Form.Control
                type="email"
                name="billingEmail"
                value={billingInfo.billingEmail}
                onChange={handleChange}
                placeholder="Enter billing email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                name="addressLine1"
                value={billingInfo.addressLine1}
                onChange={handleChange}
                placeholder="Street address, PO box"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                name="addressLine2"
                value={billingInfo.addressLine2}
                onChange={handleChange}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={billingInfo.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State / Province</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={billingInfo.state}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ZIP / Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={billingInfo.zipCode}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={billingInfo.country}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tax ID / GSTIN</Form.Label>
              <Form.Control
                type="text"
                name="taxId"
                value={billingInfo.taxId}
                onChange={handleChange}
                placeholder="Enter tax identification number"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="paymentMethod"
                value={billingInfo.paymentMethod}
                onChange={handleChange}
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="Enable Auto-Renewal"
                name="autoRenewal"
                checked={billingInfo.autoRenewal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="custom" type="submit">
          Save Billing Info
        </Button>
      </Form>
    </div>
  );
};

export default Billingsetting;
