import React from 'react';

const NavPageHeader = ({ title, description, children, className = '' }) => {
  return (
    <div className={`nav-header-unified ${className}`}>
      <h1 className="nav-heading-unified">{title}</h1>
      {description && <p className="nav-description-unified">{description}</p>}
      {children}
    </div>
  );
};

export default NavPageHeader;
