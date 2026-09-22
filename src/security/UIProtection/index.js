/**
 * UI Protection & Read-Only Security Module
 * 
 * Reusable security module that protects website reports and content
 * against casual copying, selection, dragging, shortcut extraction,
 * image saving, and unauthorized printing while preserving legitimate
 * application navigation, buttons, and form inputs.
 */

export { UIProtection, default } from './UIProtection';
export { ProtectedImage } from './ProtectedImage';
export { ProtectedText } from './ProtectedText';
export { useUIProtection } from './useUIProtection';
export { defaultProtectionConfig, resolveProtectionConfig } from './protectionConfig';
export {
  isAllowedInteractiveElement,
  isEditableInputElement,
  isImageOrGraphicElement,
  isProtectedShortcut,
  preventEvent,
  enforceImageProtection
} from './protectionUtils';
