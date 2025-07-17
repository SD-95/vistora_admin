import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Card } from 'react-bootstrap';
import { getCurrentUserRole, type Role } from '../../utils/Role';
import { admindummydata } from '../../utils/admindummydata';
import type { TeamMember } from '../../utils/admintypes';
import Editprofileform from './Editprofile';
import Changepasswordform from './Changepassword';
import Preferencesform from './Preferencesform';
import Appearanceform from './Appearanceform';
import Notificationsform from './Notificationsform';
import Languageregionform from './Languageregionform';
import Categoriesform from './Categoriesform';
import ProductsSettings from './Productsetting';
import Customersetting from './Customersetting';
import Supportticketsettings from './Supportticketsettings';
import Billingsetting from './Billingsetting';
import Integrationssetting from './Integrationssetting';
import Platformsettings from './Platformsettings';
import Automationsettings from './Automationsettings';
import Workinghourssettings from './Workinghourssettings';
import Teammanagementsettings from './Teammanagementsettings';
import Rolespermissionssettings from './Rolespermissionssettings';
import Sessionmanagementsettings from './Sessionmanagementsettings';
import Loginhistorysettings from './Loginhistorysettings';
import Securitysettings from './Securitysettings';
import Privacycompliancesettings from './Privacycompliancesettings';
import Exportsettings from './Exportsettings';
import Auditlogsettings from './Auditlogsettings';
import Deleteaccountsettings from './Deleteaccountsettings';
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Mailsetting from './Mailsetting';

const Settings: React.FC = () => {
  const role: Role = getCurrentUserRole();
  localStorage.setItem('role', 'superadmin');
  const cardHeight = '460px';

  const currentUser: TeamMember = admindummydata[0];

  const [openSection, setOpenSection] = useState<string>('Account & Identity');

  const toggleSection = (label: string) => {
    setOpenSection(prev => (prev === label ? '' : label));
  };

  const renderCategory = (label: string, items: { key: string, label: string, icon?: string }[]) => (
    <>
      <div
        className={`nav-category-label ${openSection === label ? 'open' : ''}`}
        onClick={() => toggleSection(label)}
      >
        {label}
        <span className="arrow-icon ms-auto">
          {openSection === label ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      <div className={`collapse-section ${openSection === label ? 'show' : ''}`}>
        {items.map(item => (
          <Nav.Item key={item.key} className="child-link">
            <Nav.Link eventKey={item.key}>
              {item.icon || ''} {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </div>
    </>
  );
  return (
    <Container className="my-3">
      <h2 className="settings-header">⚙️ Admin Settings</h2>
      <Tab.Container id="settings-tabs" defaultActiveKey="profile">
        <Row className="g-4 "> {/* Add gap between columns */}
          {/* Sidebar Navigation */}
          <Col md={3}>
            <Card className="scrollbar-dim" style={{ height: cardHeight, overflowY: 'auto', borderRadius: '10px' }}>
              <Card.Body className="p-2">
                <Nav variant="pills" className="flex-column settings-sidebar">
                  {renderCategory('🔐 Account & Identity', [
                    { key: 'profile', label: 'Edit Profile', icon: '👤' },
                    { key: 'password', label: 'Change Password', icon: '🔒' },
                    { key: 'preferences', label: 'Preferences', icon: '⚙️' },
                    { key: 'appearance', label: 'Appearance', icon: '🎨' },
                    { key: 'notifications', label: 'Notifications', icon: '🔔' },
                    { key: 'language', label: 'Language & Region', icon: '🌐' },
                    { key: 'mail', label: 'Mail Settings', icon: '📧' },
                  ])}

                  {renderCategory('🏢 Organization Management', [
                    { key: 'categories', label: 'Categories', icon: '🏷️' },
                    { key: 'products', label: 'Products', icon: '📦' },
                    { key: 'customers', label: 'Customers', icon: '👥' },
                    { key: 'support', label: 'Support Tickets', icon: '🎫' },
                  ])}

                  {['admin', 'superadmin'].includes(role) && renderCategory('💼 Admin Tools', [
                    { key: 'billing', label: 'Billing', icon: '💳' },
                    { key: 'integrations', label: 'Integrations', icon: '🔗' },
                  ])}

                  {['admin', 'superadmin'].includes(role) && renderCategory('🛠 Platform & Control', [
                    { key: 'platform', label: 'Platform Settings', icon: '🛠️' },
                    { key: 'automations', label: 'Task Automations', icon: '🤖' },
                    { key: 'working-hours', label: 'Working Hours', icon: '⏰' },
                  ])}

                  {['admin', 'superadmin'].includes(role) && renderCategory('👥 Team & Access', [
                    { key: 'team', label: 'Team Management', icon: '👥' },
                    ...(role === 'superadmin' ? [
                      { key: 'roles', label: 'Roles & Permissions', icon: '🧑‍⚖️' },
                      { key: 'sessions', label: 'Session Management', icon: '📍' },
                      { key: 'login-history', label: 'Login History', icon: '📜' },
                      { key: 'security', label: 'Security Settings', icon: '🔐' },
                      { key: 'compliance', label: 'Privacy & Compliance', icon: '🛡️' },
                      { key: 'export', label: 'Data Export & Backup', icon: '📤' },
                    ] : [])
                  ])}

                  {['admin', 'superadmin'].includes(role) && renderCategory('📊 Insights & Logs', [
                    { key: 'logs', label: 'Audit Logs', icon: '🧾' },
                  ])}

                  {renderCategory('🚪 Account Exit', [
                    { key: 'delete', label: 'Delete My Account', icon: '🗑️' },
                  ])}

                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col md={9} >
            <Card className="scrollbar-dim" style={{ height: cardHeight, overflowY: 'auto' }}>
              <Card.Body>
                <Tab.Content>
                  {/* Sample Tab */}
                  <Tab.Pane eventKey="profile">
                    <div className="settings-card">
                      <h4 className="settings-title">👤 Edit Profile</h4>
                      <p className="settings-description">Update your account details and personal info.</p>
                      {currentUser ? (
                        <Editprofileform user={currentUser} />
                      ) : (
                        <div>No user found</div>
                      )}
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="password">
                    <div className="settings-card">
                      <h4 className="settings-title">🔒 Change Password</h4>
                      <p className="settings-description">
                        Update your account password to keep your profile secure. Make sure your new password is strong and not shared with anyone.
                      </p>
                      <Changepasswordform />
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="preferences">
                    <div className="settings-card">
                      <h4 className="settings-title">⚙️ Preferences</h4>
                      <p className="settings-description">
                        Customize how the platform works for you. Set your default view, notification behavior, language, and other personal preferences.
                      </p>
                      <Preferencesform />
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="appearance">
                    <div className="settings-card">
                      <h4 className="settings-title">🎨 Appearance</h4>
                      <p className="settings-description">
                        Personalize the look and feel of your dashboard. Switch themes, adjust layout preferences, and enhance your experience.
                      </p>
                      <Appearanceform />
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="notifications">
                    <div className="settings-card">
                      <h4 className="settings-title">🔔 Notifications</h4>
                      <p className="settings-description">
                        Manage how and when you receive updates and alerts. Customize your email, system, and team notifications.
                      </p>
                      <Notificationsform />
                    </div>
                  </Tab.Pane>


                  <Tab.Pane eventKey="language">
                    <div className="settings-card">
                      <h4 className="settings-title">🌐 Language & Region</h4>
                      <p className="settings-description">
                        Set your preferred language, region, and timezone for a personalized experience across the platform.
                      </p>
                      <Languageregionform
                        initialLanguage={currentUser.language}
                        initialRegion={currentUser.region}
                        initialTimezone={currentUser.timezone}
                        onSave={(updated) => {
                          console.log('User saved:', updated);
                          // Optional: trigger update to state or backend
                        }}
                      />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="mail">
                    <Mailsetting />
                  </Tab.Pane>
                  <Tab.Pane eventKey="categories">
                    <div className="settings-card">
                      <h4 className="settings-title">🏷️ Categories</h4>
                      <p className="settings-description">
                        Manage the categories used across your platform to better organize content, tasks, or resources.
                      </p>
                      <Categoriesform
                        initialCategories={['Marketing', 'Development', 'Support']}
                        onSave={(updated) => {
                          console.log('Updated categories:', updated);
                          // Optional: update backend or global state
                        }}
                      />
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="products">
                    <div className="settings-card">
                      <h4 className="settings-title">📦 Product Settings</h4>
                      <p className="settings-description">
                        Configure product display behavior, review preferences, inventory alerts, and publishing rules.
                      </p>
                      <ProductsSettings onSave={(settings) => console.log('Saved settings:', settings)} />
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="customers">
                    <Customersetting />
                  </Tab.Pane>

                  <Tab.Pane eventKey="support">
                    <Supportticketsettings />
                  </Tab.Pane>

                  <Tab.Pane eventKey="billing">
                    <Billingsetting />
                  </Tab.Pane>

                  <Tab.Pane eventKey="integrations">
                    <Integrationssetting />
                  </Tab.Pane>

                  <Tab.Pane eventKey="platform">
                    <Platformsettings />
                  </Tab.Pane>

                  <Tab.Pane eventKey="automations">
                    <Automationsettings />
                  </Tab.Pane>

                  <Tab.Pane eventKey="working-hours">
                    <Workinghourssettings />
                  </Tab.Pane>

                  <Tab.Pane eventKey="team">
                    <Teammanagementsettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="roles">
                    <Rolespermissionssettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="sessions">
                    <Sessionmanagementsettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="login-history">
                    <Loginhistorysettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="security">
                    <Securitysettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="compliance">
                    <Privacycompliancesettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="export">
                    <Exportsettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="logs">
                    <Auditlogsettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="delete">
                    <Deleteaccountsettings />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Settings;
