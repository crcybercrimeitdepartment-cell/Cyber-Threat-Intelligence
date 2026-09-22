import { useEffect, useMemo } from 'react';
import { resolveProtectionConfig } from './protectionConfig';
import {
  isAllowedInteractiveElement,
  isEditableInputElement,
  isImageOrGraphicElement,
  isProtectedShortcut,
  preventEvent,
  enforceImageProtection
} from './protectionUtils';

/**
 * useUIProtection Hook
 * 
 * Attaches UI protection listeners directly to an existing DOM ref,
 * avoiding the need for an additional wrapper container.
 * 
 * @param {React.RefObject} targetRef - Reference to the target DOM element
 * @param {Object} [customConfig={}] - Protection options
 */
export function useUIProtection(targetRef, customConfig = {}) {
  const activeConfig = useMemo(() => {
    return resolveProtectionConfig(customConfig);
  }, [customConfig]);

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;

    const customSelectors = activeConfig.ignoredSelectors || [];

    // Copy & Cut
    const handleCopyCut = (e) => {
      if (!activeConfig.antiCopy) return;
      if (
        activeConfig.allowInteractiveElements &&
        activeConfig.allowInputCopy &&
        isEditableInputElement(e.target)
      ) {
        return;
      }
      if (
        activeConfig.allowInteractiveElements &&
        isAllowedInteractiveElement(e.target, el, customSelectors)
      ) {
        return;
      }
      preventEvent(e);
    };

    // Right-Click Context Menu
    const handleContextMenu = (e) => {
      if (!activeConfig.rightClickProtection) return;
      if (
        activeConfig.allowInteractiveElements &&
        isEditableInputElement(e.target)
      ) {
        return;
      }
      preventEvent(e);
    };

    // Selection
    const handleSelectStart = (e) => {
      if (!activeConfig.antiSelect) return;
      if (
        activeConfig.allowInteractiveElements &&
        isEditableInputElement(e.target)
      ) {
        return;
      }
      if (
        activeConfig.allowInteractiveElements &&
        isAllowedInteractiveElement(e.target, el, customSelectors)
      ) {
        return;
      }
      preventEvent(e);
    };

    // Drag
    const handleDragStart = (e) => {
      const isImage = isImageOrGraphicElement(e.target);
      if (activeConfig.imageDragProtection && isImage) {
        preventEvent(e);
        return;
      }
      if (activeConfig.antiDrag || activeConfig.textDragProtection) {
        if (
          activeConfig.allowInteractiveElements &&
          isAllowedInteractiveElement(e.target, el, customSelectors)
        ) {
          return;
        }
        preventEvent(e);
      }
    };

    // Drop
    const handleDrop = (e) => {
      if (activeConfig.antiDrag && !isEditableInputElement(e.target)) {
        preventEvent(e);
      }
    };

    // Keydown shortcuts
    const handleKeyDown = (e) => {
      if (isProtectedShortcut(e, activeConfig)) {
        preventEvent(e);
      }
    };

    // Enforce draggable="false" on images
    if (activeConfig.imageDragProtection) {
      enforceImageProtection(el);
    }

    el.addEventListener('copy', handleCopyCut);
    el.addEventListener('cut', handleCopyCut);
    el.addEventListener('contextmenu', handleContextMenu);
    el.addEventListener('selectstart', handleSelectStart);
    el.addEventListener('dragstart', handleDragStart);
    el.addEventListener('drop', handleDrop);
    el.addEventListener('keydown', handleKeyDown);

    return () => {
      el.removeEventListener('copy', handleCopyCut);
      el.removeEventListener('cut', handleCopyCut);
      el.removeEventListener('contextmenu', handleContextMenu);
      el.removeEventListener('selectstart', handleSelectStart);
      el.removeEventListener('dragstart', handleDragStart);
      el.removeEventListener('drop', handleDrop);
      el.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetRef, activeConfig]);

  return {
    isProtected: true,
    config: activeConfig
  };
}

export default useUIProtection;
