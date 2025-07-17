import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notificationpanel from '../components/Notificationpanel';

const Adminlayout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Auto-close mobile sidebar/notification on resize to desktop
      if (!mobile) {
        setSidebarCollapsed(false); // optional: keep or remove
        setNotificationOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainClass = [
    'admin-main',
    !isMobile && !isSidebarCollapsed && 'with-sidebar',
    !isMobile && isSidebarCollapsed && 'collapsed',
    !isMobile && isNotificationOpen && 'with-notification'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="admin-root">
      <Header
        onToggleNotification={() => setNotificationOpen(prev => !prev)}
        notificationCount={3} // or dynamic state
        mailCount={5}
        chatCount={2}
      />

      <div className="admin-body">
        <Sidebar
          collapsed={isSidebarCollapsed}
          isMobile={isMobile}
          onToggleCollapse={() => setSidebarCollapsed(prev => !prev)} // ✅ pass handler
        />

        <main className={mainClass}>
          <div className="admin-content-scroll">
            <Outlet />
          </div>
          <Footer />
        </main>

        {isNotificationOpen && (
          <Notificationpanel isMobile={isMobile} onClose={() => setNotificationOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Adminlayout;


