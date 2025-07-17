import React, { useState, useEffect } from 'react';
import { Navbar, Dropdown, Badge, Button } from 'react-bootstrap';
import {
  FaBell, FaUserCircle, FaEnvelope, FaCog, FaUserCheck,
  FaUserSlash, FaBriefcase, FaCoffee, FaUtensils
} from 'react-icons/fa';
import { IoIosChatbubbles } from "react-icons/io";
import logo from '../assets/images/logo/circle_logo.png';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/Authslice';

const Header: React.FC<{
  onToggleNotification: () => void;
  notificationCount: number;
  mailCount: number;
  chatCount: number;
}> = ({ onToggleNotification, notificationCount, mailCount, chatCount }) => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('role');
    window.location.href = '/pages/Login';
  };

  const statusOptions = [
    { label: 'Online', icon: <FaUserCheck className="text-success" /> },
    { label: 'Offline', icon: <FaUserSlash className="text-secondary" /> },
    { label: 'Meeting', icon: <FaBriefcase className="text-primary" /> },
    { label: 'Break', icon: <FaCoffee className="text-warning" /> },
    { label: 'Lunch', icon: <FaUtensils className="text-info" /> },
    { label: 'Dinner', icon: <FaUtensils className="text-danger" /> },
  ];

  return (
    <Navbar className="admin-header px-3 py-2" fixed="top" expand="lg">
      <Navbar.Brand
        as={Link}
        to={role === 'serviceexecutive' ? '/pages/dashboard/serviceexecutive' : '/pages/dashboard/superadmin'}
        className="d-flex align-items-center gap-3 brand-container"
      >
        <img src={logo} alt="Logo" className="header-logo" />
        <div className="brand-text">
          <div className="brand-title">Vistora Admin</div>
          <div className="brand-subtitle">Shop Smart, Shop Vistora</div>
        </div>
      </Navbar.Brand>

      <div className="d-flex align-items-center ms-auto header-actions">
        {/* ✅ Availability is always visible */}
        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="icon-wrapper no_caret" title="Availability">
            <FaUserCheck size={18} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {statusOptions.map((status, idx) => (
              <Dropdown.Item
                key={idx}
                className="d-flex align-items-center gap-2 border-bottom py-2 px-3 hover-highlight"
              >
                {status.icon}
                <span>{status.label}</span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Hide icons on mobile */}
        {!isMobile && (
          <>
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="icon-wrapper no_caret" title="Chat">
                <IoIosChatbubbles size={18} />
                <Badge bg="danger" pill className="icon-badge">{chatCount || 2}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="glass-dropdown p-2" style={{ width: 240 }}>
                <div className="text-muted small px-2 mb-2">Recent Chats</div>

                {[...Array(2)].map((_, i) => (
                  <div key={i} className="chat-dropdown-item">
                    <div className="chat-avatar">A</div>
                    <div className="chat-userinfo">
                      <div className="chat-username">Alice Johnson</div>
                      <div className="chat-snippet">Hey, just checking in about the report...</div>
                    </div>
                    <div className="chat-meta">
                      <div className="chat-time">10:42 AM</div>
                      <span className="chat-badge">2</span>
                    </div>
                  </div>
                ))}

                <div className="px-2">
                  <Button
                    as={Link as any}
                    to="/pages/Servicechat"
                    size="sm"
                    className="chat-footer-btn rounded-pill"
                  >
                    View All Chats
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Link to="/pages/Mailpage" className="icon-wrapper" title="Email">
              <FaEnvelope size={18} />
              <Badge bg="danger" pill className="icon-badge">{mailCount || 17}</Badge>
            </Link>

            <div className="icon-wrapper" title="Notifications" onClick={onToggleNotification}>
              <FaBell size={18} />
              {notificationCount > 0 && (
                <Badge bg="danger" pill className="icon-badge">{notificationCount}</Badge>
              )}
            </div>

            <Link to="/pages/Settings" className="icon-wrapper" title="Settings">
              <FaCog size={18} />
            </Link>
          </>
        )}

        {/* Profile Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="icon-wrapper no_caret" title="Profile">
            <FaUserCircle size={20} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="glass-dropdown dropdown-float-menu">
            <div className="dropdown-avatar-wrapper px-3 py-2">
              <FaUserCircle className="dropdown-avatar" />
              <div className="dropdown-info">
                <div className="dropdown-name">Admin</div>
                <div className="dropdown-role">Super Admin</div>
              </div>
            </div>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="/pages/Profile">My Profile</Dropdown.Item>

            {/* Icons rendered here only on mobile */}
            {isMobile && (
              <>
                <Dropdown.Item as={Link} to="/pages/Settings">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Settings</span>
                  </div>
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/pages/Mailpage">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Mail</span>
                    <Badge bg="danger" pill>{mailCount || 17}</Badge>
                  </div>
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/pages/chat">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Messages</span>
                    <Badge bg="danger" pill>{chatCount || 2}</Badge>
                  </div>
                </Dropdown.Item>

                <Dropdown.Item onClick={onToggleNotification}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Notifications</span>
                    <Badge bg="danger" pill>{notificationCount || 0}</Badge>
                  </div>
                </Dropdown.Item>
              </>
            )}
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="logout-item">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;
