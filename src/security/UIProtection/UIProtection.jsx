import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { resolveProtectionConfig } from './protectionConfig';
import {
  isAllowedInteractiveElement,
  isEditableInputElement,
  isImageOrGraphicElement,
  isProtectedShortcut,
  preventEvent,
  enforceImageProtection
} from './protectionUtils';
import './UIProtection.css';

/**
 * UIProtection Component
 * 
 * High-performance, isolated container that protects report content
 * from casual copying, selecting, dragging, right-clicking, shortcut extraction,
 * image saving, and unauthorized printing while keeping all legitimate
 * buttons, links, inputs, and navigation 100% functional.
 */
export const UIProtection = ({
  children,
  as: Component = 'div',
  className = '',
  config,
  antiCopy,
  antiSelect,
  antiDrag,
  rightClickProtection,
  keyboardShortcutProtection,
  imageDragProtection,
  imageOpenProtection,
  textHighlightProtection,
  textDragProtection,
  linkInteractionProtection,
  readOnlyMode,
  printRestriction,
  allowInteractiveElements,
  allowInputCopy,
  printNoticeText,
  ignoredSelectors,
  onProtectionEvent,
  ...restProps
}) => {
  const containerRef = useRef(null);

  // Resolve config from passed config object and individual prop overrides
  const activeConfig = useMemo(() => {
    return resolveProtectionConfig(config, {
      antiCopy,
      antiSelect,
      antiDrag,
      rightClickProtection,
      keyboardShortcutProtection,
      imageDragProtection,
      imageOpenProtection,
      textHighlightProtection,
      textDragProtection,
      linkInteractionProtection,
      readOnlyMode,
      printRestriction,
      allowInteractiveElements,
      allowInputCopy,
      printNoticeText
    });
  }, [
    config,
    antiCopy,
    antiSelect,
    antiDrag,
    rightClickProtection,
    keyboardShortcutProtection,
    imageDragProtection,
    imageOpenProtection,
    textHighlightProtection,
    textDragProtection,
    linkInteractionProtection,
    readOnlyMode,
    printRestriction,
    allowInteractiveElements,
    allowInputCopy,
    printNoticeText
  ]);

  const customSelectors = ignoredSelectors || activeConfig.ignoredSelectors || [];

  // Helper to trigger optional protection notification callback
  const notifyProtection = useCallback((action, event) => {
    if (typeof onProtectionEvent === 'function') {
      onProtectionEvent({ action, event, config: activeConfig });
    }
  }, [onProtectionEvent, activeConfig]);

  // 19.1 Anti-Copy UI Event Handler
  const handleCopy = useCallback((e) => {
    if (!activeConfig.antiCopy) return;

    // Check if copy is originating inside an allowed interactive input
    if (
      activeConfig.allowInteractiveElements &&
      activeConfig.allowInputCopy &&
      isEditableInputElement(e.target)
    ) {
      return;
    }

    if (
      activeConfig.allowInteractiveElements &&
      isAllowedInteractiveElement(e.target, containerRef.current, customSelectors)
    ) {
      return;
    }

    preventEvent(e);
    notifyProtection('copy', e);
  }, [activeConfig, customSelectors, notifyProtection]);

  // 19.1 Anti-Cut Event Handler
  const handleCut = useCallback((e) => {
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
      isAllowedInteractiveElement(e.target, containerRef.current, customSelectors)
    ) {
      return;
    }

    preventEvent(e);
    notifyProtection('cut', e);
  }, [activeConfig, customSelectors, notifyProtection]);

  // 19.4 Right-Click Protection Event Handler
  const handleContextMenu = useCallback((e) => {
    if (!activeConfig.rightClickProtection) return;

    // Allow context menu if right-clicking on genuine form inputs (for paste, etc.)
    if (
      activeConfig.allowInteractiveElements &&
      isEditableInputElement(e.target)
    ) {
      return;
    }

    preventEvent(e);
    notifyProtection('contextmenu', e);
  }, [activeConfig, notifyProtection]);

  // 19.2 Anti-Select UI Event Handler
  const handleSelectStart = useCallback((e) => {
    if (!activeConfig.antiSelect) return;

    if (
      activeConfig.allowInteractiveElements &&
      isEditableInputElement(e.target)
    ) {
      return;
    }

    if (
      activeConfig.allowInteractiveElements &&
      isAllowedInteractiveElement(e.target, containerRef.current, customSelectors)
    ) {
      return;
    }

    preventEvent(e);
    notifyProtection('selectstart', e);
  }, [activeConfig, customSelectors, notifyProtection]);

  // 19.3 & 19.6 Anti-Drag UI Event Handler
  const handleDragStart = useCallback((e) => {
    const isImage = isImageOrGraphicElement(e.target);

    // Image drag protection
    if (activeConfig.imageDragProtection && isImage) {
      preventEvent(e);
      notifyProtection('image-drag', e);
      return;
    }

    // General anti-drag
    if (activeConfig.antiDrag || activeConfig.textDragProtection) {
      if (
        activeConfig.allowInteractiveElements &&
        isAllowedInteractiveElement(e.target, containerRef.current, customSelectors)
      ) {
        return;
      }

      preventEvent(e);
      notifyProtection('dragstart', e);
    }
  }, [activeConfig, customSelectors, notifyProtection]);

  // 19.3 Anti-Drop Event Handler
  const handleDrop = useCallback((e) => {
    if (activeConfig.antiDrag && !isEditableInputElement(e.target)) {
      preventEvent(e);
    }
  }, [activeConfig]);

  // 19.11 Anti-Image-Open Event Handler (Prevents middle click open)
  const handleAuxClick = useCallback((e) => {
    if (activeConfig.imageOpenProtection && e.button === 1) {
      if (isImageOrGraphicElement(e.target)) {
        preventEvent(e);
        notifyProtection('image-auxclick', e);
      }
    }
  }, [activeConfig, notifyProtection]);

  // 19.5 Keyboard Shortcut Protection Event Handler
  const handleKeyDown = useCallback((e) => {
    if (isProtectedShortcut(e, activeConfig)) {
      preventEvent(e);
      notifyProtection(`shortcut-${e.key.toLowerCase()}`, e);
    }
  }, [activeConfig, notifyProtection]);

  // Window-level Print Protection Listener (Ctrl+P / Cmd+P & beforeprint)
  useEffect(() => {
    if (!activeConfig.printRestriction) return;

    const handleWindowKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd && e.key && e.key.toLowerCase() === 'p') {
        const container = containerRef.current;
        if (container && (container.contains(document.activeElement) || container.contains(e.target))) {
          preventEvent(e);
          notifyProtection('shortcut-print', e);
        }
      }
    };

    window.addEventListener('keydown', handleWindowKeyDown, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown, { capture: true });
    };
  }, [activeConfig.printRestriction, notifyProtection]);

  // Draggable="false" DOM Mutation Observer to ensure dynamically loaded images are protected
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (activeConfig.imageDragProtection) {
      enforceImageProtection(container);

      const observer = new MutationObserver(() => {
        enforceImageProtection(container);
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: false
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [activeConfig.imageDragProtection]);

  // Read-only mode: ensure form elements inside protected container default to readOnly
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !activeConfig.readOnlyMode) return;

    const inputs = container.querySelectorAll('input:not([data-allow-interaction="true"]), textarea:not([data-allow-interaction="true"])');
    inputs.forEach((input) => {
      if (!input.hasAttribute('data-allow-interaction')) {
        input.setAttribute('readonly', 'true');
      }
    });
  }, [activeConfig.readOnlyMode]);

  // Build classes
  const classes = [
    'ui-protected-container',
    activeConfig.antiSelect ? 'ui-protected--anti-select' : '',
    activeConfig.antiDrag ? 'ui-protected--anti-drag' : '',
    activeConfig.imageDragProtection ? 'ui-protected--image-drag' : '',
    activeConfig.textHighlightProtection ? 'ui-protected--text-highlight-protection' : '',
    activeConfig.linkInteractionProtection ? 'ui-protected--link-protection' : '',
    activeConfig.readOnlyMode ? 'ui-protected--read-only' : '',
    activeConfig.printRestriction ? 'ui-protected--print-restriction' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <Component
        ref={containerRef}
        className={classes}
        onCopy={handleCopy}
        onCut={handleCut}
        onContextMenu={handleContextMenu}
        onSelectStart={handleSelectStart}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onAuxClick={handleAuxClick}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {children}
      </Component>

      {/* 19.7 Print Restriction Notice (only renders visually during print media) */}
      {activeConfig.printRestriction && (
        <div className="ui-protected-print-notice" aria-hidden="true">
          <h2>Protected Report Notice</h2>
          <p>{activeConfig.printNoticeText}</p>
        </div>
      )}
    </>
  );
};

export default UIProtection;
