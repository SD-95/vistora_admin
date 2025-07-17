import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="admin-footer">
      &copy; {new Date().getFullYear()} Vistora Admin Panel. All rights reserved.
    </footer>
  );
};

export default Footer;