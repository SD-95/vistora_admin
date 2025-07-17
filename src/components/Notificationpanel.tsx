import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface NotificationPanelProps {
  isMobile: boolean;
  onClose: () => void;
}

const Notificationpanel: React.FC<NotificationPanelProps> = ({ onClose }) => {

  return (
    <React.Fragment>
    <aside className="notification-panel">
      <div className="notification-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Notifications</h6>
        {onClose && (
          <button className="notification-close" onClick={onClose}>
            <FaArrowRight />
          </button>
        )}
      </div>
      <ul className="notification-list mt-3">
        <li>🔔 New Order Placed</li>
        <li>📦 Inventory Running Low</li>
        <li>👤 New Customer Signup</li>
        <li>💬 Message from Support</li>
      </ul>
    </aside>
    </React.Fragment>
  );
};

export default Notificationpanel;
