import React from 'react';
import './UIProtection.css';

/**
 * ProtectedImage Component
 * 
 * Reusable image component that prevents casual dragging, copying,
 * right-click saving, and opening in new tabs.
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Accessible image description
 * @param {boolean} [overlay=false] - Optional invisible overlay layer to block direct mouse interaction
 * @param {string} [className=''] - Custom image classes
 * @param {string} [wrapperClassName=''] - Custom wrapper classes
 */
export const ProtectedImage = ({
  src,
  alt = '',
  overlay = false,
  className = '',
  wrapperClassName = '',
  onContextMenu,
  onDragStart,
  onAuxClick,
  ...props
}) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
    if (onContextMenu) onContextMenu(e);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    if (onDragStart) onDragStart(e);
  };

  const handleAuxClick = (e) => {
    if (e.button === 1) {
      e.preventDefault();
    }
    if (onAuxClick) onAuxClick(e);
  };

  const imgElement = (
    <img
      src={src}
      alt={alt}
      draggable={false}
      data-protected-image="true"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onAuxClick={handleAuxClick}
      className={`ui-protected-image ${className}`}
      {...props}
    />
  );

  if (!overlay) {
    return imgElement;
  }

  return (
    <div className={`ui-protected-image-wrapper ${wrapperClassName}`}>
      {imgElement}
      <div 
        className="ui-protected-image-overlay" 
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        aria-hidden="true"
      />
    </div>
  );
};

export default ProtectedImage;
