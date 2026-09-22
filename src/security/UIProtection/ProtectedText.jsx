import React from 'react';
import './UIProtection.css';

/**
 * ProtectedText Component
 * 
 * Protects specific inline or block text snippets from selection,
 * copying, and dragging while blending seamlessly with existing typography.
 * 
 * @param {React.ReactNode} children - Text content
 * @param {string} [as='span'] - HTML element tag name
 * @param {string} [className=''] - Additional CSS classes
 */
export const ProtectedText = ({
  children,
  as: Component = 'span',
  className = '',
  onCopy,
  onContextMenu,
  onDragStart,
  ...props
}) => {
  const handleCopy = (e) => {
    e.preventDefault();
    if (onCopy) onCopy(e);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (onContextMenu) onContextMenu(e);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    if (onDragStart) onDragStart(e);
  };

  return (
    <Component
      className={`ui-protected--anti-select ui-protected--text-highlight-protection ui-protected--anti-drag ${className}`}
      onCopy={handleCopy}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ProtectedText;
