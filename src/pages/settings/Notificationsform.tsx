import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface NotificationPreferences {
  emailUpdates: boolean;
  productAnnouncements: boolean;
  systemAlerts: boolean;
  marketing: boolean;
  pushNotifications: boolean;
  weeklySummary: boolean;
  accountSecurity: boolean;
  loginAlerts: boolean;
  profileChanges: boolean;
  orderUpdates: boolean;
  customerTickets: boolean;
  teamMentions: boolean;
  billingReminders: boolean;
}

const Notificationsform: React.FC = () => {
  const [formData, setFormData] = useState<NotificationPreferences>({
    emailUpdates: true,
    productAnnouncements: true,
    systemAlerts: true,
    marketing: false,
    pushNotifications: true,
    weeklySummary: true,
    accountSecurity: true,
    loginAlerts: true,
    profileChanges: true,
    orderUpdates: true,
    customerTickets: true,
    teamMentions: true,
    billingReminders: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Notification Settings:', formData);
    // Later: Save to backend/localStorage
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* General */}
      <h5>General Notifications</h5>
      <Form.Check type="switch" id="emailUpdates" name="emailUpdates" label="📧 Receive Email Updates" checked={formData.emailUpdates} onChange={handleChange} />
      <Form.Check type="switch" id="pushNotifications" name="pushNotifications" label="📱 Push Notifications" checked={formData.pushNotifications} onChange={handleChange} />
      <Form.Check type="switch" id="weeklySummary" name="weeklySummary" label="🗓️ Weekly Summary Report" checked={formData.weeklySummary} onChange={handleChange} />

      {/* Platform & System */}
      <hr />
      <h5>Security & Account</h5>
      <Form.Check type="switch" id="accountSecurity" name="accountSecurity" label="🔐 Account Security Alerts" checked={formData.accountSecurity} onChange={handleChange} />
      <Form.Check type="switch" id="loginAlerts" name="loginAlerts" label="🔑 Login Notifications" checked={formData.loginAlerts} onChange={handleChange} />
      <Form.Check type="switch" id="profileChanges" name="profileChanges" label="📝 Profile or Password Changes" checked={formData.profileChanges} onChange={handleChange} />

      {/* Business Related */}
      <hr />
      <h5>Business Notifications</h5>
      <Form.Check type="switch" id="orderUpdates" name="orderUpdates" label="📦 Order Status Updates" checked={formData.orderUpdates} onChange={handleChange} />
      <Form.Check type="switch" id="customerTickets" name="customerTickets" label="📨 Customer Tickets or Messages" checked={formData.customerTickets} onChange={handleChange} />
      <Form.Check type="switch" id="teamMentions" name="teamMentions" label="👥 Mentions from Team" checked={formData.teamMentions} onChange={handleChange} />
      <Form.Check type="switch" id="billingReminders" name="billingReminders" label="💳 Billing Reminders & Invoices" checked={formData.billingReminders} onChange={handleChange} />

      {/* Marketing */}
      <hr />
      <h5>Marketing</h5>
      <Form.Check type="switch" id="productAnnouncements" name="productAnnouncements" label="📢 Product Announcements" checked={formData.productAnnouncements} onChange={handleChange} />
      <Form.Check type="switch" id="marketing" name="marketing" label="💼 Receive Marketing Content" checked={formData.marketing} onChange={handleChange} />

      <Button type="submit" variant="custom" className="mt-4">
        Save Notification Settings
      </Button>
    </Form>
  );
};

export default Notificationsform;
