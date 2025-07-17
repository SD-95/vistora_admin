import React, { useState, useEffect, type JSX } from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  FaCogs,
  FaTachometerAlt,
  FaAngleDown,
  FaAngleRight,
  FaBox,
  FaBars,
  FaTimes,
  FaAddressBook,
  FaUserCircle,
  FaUserCog,
  FaShoppingCart
} from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import { VscArrowSmallRight } from 'react-icons/vsc';
import profile from '../assets/images/profile/profile.jpg';
import { useAppSelector } from '../redux/hooks';

interface SidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  key: string;
  label: string;
  path?: string;
  icon?: JSX.Element;
  children?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, isMobile, onToggleCollapse }) => {
  const [mobileVisible, setMobileVisible] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const { role, userEmail } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggle = () => {
    if (isMobile) {
      setMobileVisible(prev => !prev);
    } else {
      onToggleCollapse();
    }
  };

  const toggleMenu = (key: string, depth: number) => {
    setOpenMenus(prev => {
      const isAlreadyOpen = prev[key];
      if (depth === 0) {
        const newState: { [key: string]: boolean } = {};
        if (!isAlreadyOpen) newState[key] = true;
        return newState;
      } else {
        return {
          ...prev,
          [key]: !isAlreadyOpen
        };
      }
    });
  };

  const handleMenuClick = (item: MenuItem, depth: number) => {
    const hasChildren = item.children && item.children.length > 0;
    if (hasChildren) {
      toggleMenu(item.key, depth);
    } else if (isMobile) {
      setMobileVisible(false);
    }
  };

  const isMenuItemActive = (item: MenuItem): boolean => {
    if (item.path && location.pathname.startsWith(item.path)) return true;
    if (item.children) return item.children.some(isMenuItemActive);
    return false;
  };

  const baseMenuItems: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <FaTachometerAlt />,
      path: '/pages/dashboard/superadmin',
    },
    {
      key: 'advanced',
      label: 'Nested Menu',
      icon: <FaCogs />,
      children: [
        {
          key: 'level1',
          label: 'Level 1',
          children: [
            {
              key: 'level2',
              label: 'Level 2',
              children: [
                {
                  key: 'level3',
                  label: 'Level 3',
                  children: [
                    {
                      key: 'level4',
                      label: 'Level 4',
                      children: [
                        {
                          key: 'level5',
                          label: 'Level 5',
                          children: [
                            {
                              key: 'level6',
                              label: 'Level 6',
                              children: [
                                {
                                  key: 'level7',
                                  label: 'Level 7',
                                  children: [
                                    {
                                      key: 'level8',
                                      label: 'Level 8',
                                      path: '/pages/advanced/level8'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: <FaShoppingCart />,
      path: '/pages/orders/Orderslist',
    },
    {
      key: 'account',
      label: 'My Account',
      icon: <FaUserCircle />,
      children: [
        { key: 'myprofile', label: 'My Profile', path: '/pages/Profile' },
        { key: 'servicemail', label: 'Service Mail', path: '/pages/Mailpage' },
        { key: 'serviceconnect', label: 'Service Connect', path: '/pages/Servicechat' }
      ]
    },
    {
      key: 'customers',
      label: 'Customers',
      icon: <FaAddressBook />,
      children: [
        { key: 'customerlist', label: 'Customer List', path: '/pages/customers/Customerlist' },
        { key: 'customerprofile', label: 'Customer Profile', path: '/pages/customers/Customerprofile' }
      ]
    },
    {
      key: 'users',
      label: 'Users',
      icon: <FaUserCog />,
      children: [
        { key: 'allusers', label: 'User List', path: '/pages/team/Alluserlist' },
        { key: 'roles', label: 'Roles & Permissions', path: '/pages/team/Rolepermission' }
      ]
    },
    {
      key: 'products',
      label: 'Product List',
      icon: <FaBox />,
      path: '/pages/products/Productlist',
    },
    {
      key: 'support',
      label: 'Customer Support',
      icon: <MdSupportAgent />,
      path: '/pages/support/Supportdashboard'
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <FaCogs />,
      path: '/pages/Settings',
    }
  ];

  const menuItems: MenuItem[] =
    role === 'serviceexecutive'
      ? baseMenuItems.filter(item => !['orders', 'users', 'products'].includes(item.key))
      : baseMenuItems;

  useEffect(() => {
    const openMatchingMenus = (items: MenuItem[], parents: string[] = []) => {
      for (const item of items) {
        if (item.path && location.pathname.startsWith(item.path)) {
          const openMap: { [key: string]: boolean } = {};
          parents.forEach(p => (openMap[p] = true));
          setOpenMenus(prev => ({ ...prev, ...openMap }));
          return;
        }
        if (item.children) {
          openMatchingMenus(item.children, [...parents, item.key]);
        }
      }
    };
    openMatchingMenus(menuItems);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 768) {
      setMobileVisible(false);
    }
  }, [windowWidth]);

  const sidebarClass = [
    'admin-sidebar',
    isMobile ? (mobileVisible ? 'mobile-visible' : 'mobile-hidden') : collapsed ? 'collapsed' : ''
  ]
    .filter(Boolean)
    .join(' ');

  const shouldShowLabel = isMobile ? mobileVisible : !collapsed;

  const renderMenuItems = (items: MenuItem[], depth = 0): JSX.Element[] =>
    items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openMenus[item.key];
      const showIcon = item.icon && depth === 0;
      const isActive = isMenuItemActive(item);

      const menuContent = (
        <div
          className={`sidebar-item d-flex align-items-center ${isActive ? 'active' : ''}`}
          onClick={() => handleMenuClick(item, depth)}
          style={{ paddingLeft: `${16 + depth * 16}px`, cursor: 'pointer' }}
        >
          {showIcon && <span className="sidebar-icon">{item.icon}</span>}
          {shouldShowLabel && !showIcon && depth > 0 && (
            <span className="sidebar-icon text-white me-2">
              <VscArrowSmallRight />
            </span>
          )}
          {shouldShowLabel && <span className="sidebar-label">{item.label}</span>}
          {shouldShowLabel && hasChildren && (
            <span className="submenu-arrow ms-auto">
              {isOpen ? <FaAngleDown /> : <FaAngleRight />}
            </span>
          )}
        </div>
      );

      const wrappedMenu = item.path ? (
        <Link to={item.path} className="text-decoration-none text-reset">
          {menuContent}
        </Link>
      ) : (
        menuContent
      );

      return (
        <div key={item.key} className={`sidebar-item-wrapper depth-${depth}`}>
          {!shouldShowLabel && depth === 0 && item.label ? (
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id={`tooltip-${item.key}`}>{item.label}</Tooltip>}
            >
              {wrappedMenu}
            </OverlayTrigger>
          ) : (
            wrappedMenu
          )}
          {hasChildren && isOpen && shouldShowLabel && (
            <div className="sidebar-submenu">
              {renderMenuItems(item.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });

  const userName = ['superadmin', 'admin'].includes(role ?? '') ? 'Admin User' : 'Team Member';
  const userRole =
    role === 'superadmin'
      ? 'Super Admin'
      : role === 'admin'
      ? 'Admin'
      : role === 'team'
      ? 'Team Member'
      : role === 'serviceexecutive'
      ? 'Service Executive'
      : 'Guest';

  return (
    <div className={sidebarClass}>
      <div className="sidebar-toggle-icon" onClick={handleToggle}>
        <span className="chevron-icon">
          {(collapsed || (isMobile && !mobileVisible)) ? <FaBars /> : <FaTimes />}
        </span>
      </div>

      <div className={`sidebar-user-info ${!shouldShowLabel ? 'collapsed-user-info' : ''}`}>
        {!shouldShowLabel ? (
          <div className="sidebar-user-collapsed-avatar">
            <img src={profile} alt="User" className="sidebar-avatar-collapsed" />
          </div>
        ) : (
          <div className="sidebar-user-flex">
            <div className="sidebar-user-avatar-wrapper">
              <img src={profile} alt="Admin" className="sidebar-user-avatar" />
              <span className="sidebar-company-badge">Vistora</span>
            </div>
            <div className="sidebar-user-details">
              <div className="sidebar-user-name">{userName}</div>
              <div className="sidebar-user-role">{userRole}</div>
              <div className="sidebar-user-email">{userEmail || 'user@vistora.com'}</div>
            </div>
          </div>
        )}
        {shouldShowLabel && <hr className="sidebar-divider" />}
      </div>

      <div className="sidebar-content">
        <Nav className="flex-column sidebar-nav">{renderMenuItems(menuItems)}</Nav>
      </div>

      {shouldShowLabel && (
        <div className="sidebar-footer">
          <hr className="sidebar-divider" />
          <div className="sidebar-footer-content text-center">© 2025 Vistora</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
