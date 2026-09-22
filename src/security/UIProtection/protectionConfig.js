/**
 * UI Protection & Read-Only Security Module Configuration
 * 
 * Centralized settings controlling all aspects of the UI protection layer.
 * Every option can be toggled globally or overridden at the component level.
 */

export const defaultProtectionConfig = {
  // 19.1 Anti-Copy UI: Restrict clipboard copy & cut operations
  antiCopy: true,

  // 19.2 Anti-Select UI: Restrict mouse & touch text selection
  antiSelect: true,

  // 19.3 Anti-Drag UI: Prevent dragging UI cards, text, and containers
  antiDrag: true,

  // 19.4 Right-Click Protection: Prevent browser context menu
  rightClickProtection: true,

  // 19.5 Keyboard Shortcut Protection: Intercept Ctrl/Cmd+C, Ctrl/Cmd+A, Ctrl/Cmd+X, etc.
  keyboardShortcutProtection: true,

  // 19.6 & 19.10 Image Save / Drag Protection: Disable dragging graphics, icons, logos
  imageDragProtection: true,

  // 19.11 Anti-Image-Open: Prevent middle-click open or context-menu image extraction
  imageOpenProtection: true,

  // 19.8 Anti-Text-Highlight UI: Suppress visual selection highlight colors
  textHighlightProtection: true,

  // 19.9 Anti-Text-Drag UI: Prevent dragging any text passages
  textDragProtection: true,

  // 19.12 Anti-Link-Interaction UI: Prevent non-interactive elements from mimicking links
  linkInteractionProtection: true,

  // 19.13 Read-Only UI Mode: Prevent inline content editing and display as read-only
  readOnlyMode: true,

  // 19.7 Print Restriction UI: Intercept Ctrl+P, beforeprint, and apply print media styles
  printRestriction: true,

  // Exceptions & Accessibility: Ensure genuine buttons, inputs, links stay functional
  allowInteractiveElements: true,

  // Allow copy inside genuine form inputs (e.g. search fields) when interactable
  allowInputCopy: true,

  // Custom text displayed during restricted print preview
  printNoticeText: 'This report contains protected threat intelligence and is restricted from unauthorized printing.',

  // Elements or selectors to explicitly exempt from protection
  ignoredSelectors: [
    '[data-protection-ignore="true"]',
    '[data-allow-interaction="true"]',
    'button',
    'a[href]',
    'input',
    'textarea',
    'select',
    '[role="button"]',
    '[role="link"]',
    '[role="tab"]'
  ]
};

/**
 * Merge user-provided config and individual boolean props with defaults.
 * 
 * @param {Object} [userConfig={}] - Configuration object passed via config prop
 * @param {Object} [propOverrides={}] - Individual boolean props that override config
 * @returns {Object} Fully resolved configuration object
 */
export function resolveProtectionConfig(userConfig = {}, propOverrides = {}) {
  const merged = { ...defaultProtectionConfig, ...userConfig };

  // Allow direct boolean props to take precedence over config object
  const directPropKeys = [
    'antiCopy',
    'antiSelect',
    'antiDrag',
    'rightClickProtection',
    'keyboardShortcutProtection',
    'imageDragProtection',
    'imageOpenProtection',
    'textHighlightProtection',
    'textDragProtection',
    'linkInteractionProtection',
    'readOnlyMode',
    'printRestriction',
    'allowInteractiveElements',
    'allowInputCopy',
    'printNoticeText'
  ];

  for (const key of directPropKeys) {
    if (propOverrides[key] !== undefined) {
      merged[key] = propOverrides[key];
    }
  }

  return merged;
}
