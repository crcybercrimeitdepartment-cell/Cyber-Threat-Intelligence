/**
 * UI Protection & Read-Only Security Module Utilities
 * 
 * Helper functions for DOM inspection, event discrimination,
 * interactive exceptions, and keyboard shortcut detection.
 */

/**
 * Check if an event target or one of its parents matches an interactive exception.
 *
 * @param {EventTarget|HTMLElement} target - The event target
 * @param {HTMLElement} [container] - The boundary container element
 * @param {string[]} [customSelectors=[]] - Additional selectors to exempt
 * @returns {boolean} True if the element should be allowed full interaction
 */
/**
 * Safe check for DOM element across browser and test/SSR environments
 *
 * @param {any} target
 * @returns {boolean}
 */
export function isDOMElement(target) {
  if (!target) return false;
  if (typeof Element !== 'undefined') {
    return target instanceof Element;
  }
  return typeof target === 'object' && typeof target.getAttribute === 'function';
}

/**
 * Check if an event target or one of its parents matches an interactive exception.
 *
 * @param {EventTarget|HTMLElement} target - The event target
 * @param {HTMLElement} [container] - The boundary container element
 * @param {string[]} [customSelectors=[]] - Additional selectors to exempt
 * @returns {boolean} True if the element should be allowed full interaction
 */
export function isAllowedInteractiveElement(target, container, customSelectors = []) {
  if (!isDOMElement(target)) {
    return false;
  }

  // Base list of interactive elements and attributes
  const selectors = [
    '[data-allow-interaction="true"]',
    '[data-protection-ignore="true"]',
    'button',
    'a[href]',
    'input',
    'textarea',
    'select',
    'option',
    '[role="button"]',
    '[role="link"]',
    '[role="tab"]',
    '[role="menuitem"]',
    '[role="checkbox"]',
    '[role="radio"]',
    ...customSelectors
  ];

  const selectorString = selectors.join(', ');

  try {
    if (typeof target.closest === 'function') {
      const interactiveAncestor = target.closest(selectorString);
      if (interactiveAncestor) {
        // If boundary container is provided, make sure the ancestor is within it
        if (!container || (container.contains && container.contains(interactiveAncestor))) {
          return true;
        }
      }
    }
  } catch (err) {
    // If selector parsing fails or target is disconnected
    return false;
  }

  return false;
}

/**
 * Check if target is a genuine editable form field (input/textarea)
 *
 * @param {EventTarget|HTMLElement} target
 * @returns {boolean}
 */
export function isEditableInputElement(target) {
  if (!isDOMElement(target)) return false;

  const tag = (target.tagName || '').toLowerCase();
  if (tag === 'textarea') return true;
  if (tag === 'input') {
    const type = (target.getAttribute && target.getAttribute('type') ? target.getAttribute('type') : 'text').toLowerCase();
    const nonTextTypes = ['button', 'submit', 'reset', 'checkbox', 'radio', 'image', 'file'];
    return !nonTextTypes.includes(type);
  }
  return target.getAttribute && target.getAttribute('contenteditable') === 'true';
}

/**
 * Check if an element is an image, SVG graphic, logo, or canvas
 *
 * @param {EventTarget|HTMLElement} target
 * @returns {boolean}
 */
export function isImageOrGraphicElement(target) {
  if (!isDOMElement(target)) return false;

  const tag = (target.tagName || '').toLowerCase();
  if (['img', 'svg', 'picture', 'canvas'].includes(tag)) return true;
  if (typeof target.closest === 'function' && target.closest('svg, img, picture, canvas, [data-protected-image="true"]')) return true;

  return false;
}

/**
 * Determine whether a keydown event corresponds to a protected shortcut
 *
 * @param {KeyboardEvent} e - The keyboard event
 * @param {Object} config - The resolved protection configuration
 * @returns {boolean} True if the shortcut should be prevented
 */
export function isProtectedShortcut(e, config = {}) {
  const isCtrlOrCmd = e.ctrlKey || e.metaKey;
  if (!isCtrlOrCmd) return false;

  const key = e.key ? e.key.toLowerCase() : '';

  // If focus is inside an editable input and allowInputCopy is true, allow standard text editing shortcuts
  if (config.allowInputCopy && isEditableInputElement(e.target)) {
    // Allow copy/select/cut inside active form inputs
    if (['c', 'x', 'a', 'v', 'z', 'y'].includes(key)) {
      return false;
    }
  }

  // Print restriction: Ctrl+P / Cmd+P
  if (config.printRestriction && key === 'p') {
    return true;
  }

  // Keyboard shortcut protection
  if (config.keyboardShortcutProtection) {
    // Copy: Ctrl+C / Cmd+C
    if (config.antiCopy && key === 'c') return true;

    // Cut: Ctrl+X / Cmd+X
    if (config.antiCopy && key === 'x') return true;

    // Select All: Ctrl+A / Cmd+A
    if (config.antiSelect && key === 'a') return true;

    // Save Page: Ctrl+S / Cmd+S
    if (key === 's') return true;

    // View Source: Ctrl+U / Cmd+U
    if (key === 'u') return true;
  }

  return false;
}

/**
 * Safely prevent an event and stop propagation
 *
 * @param {Event} e
 */
export function preventEvent(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
}

/**
 * Enforce draggable="false" and drag-prevention on images/graphics inside a container
 *
 * @param {HTMLElement} container
 */
export function enforceImageProtection(container) {
  if (!container || !container.querySelectorAll) return;

  const images = container.querySelectorAll('img, svg, picture, canvas, [data-protected-image="true"]');
  images.forEach((node) => {
    node.setAttribute('draggable', 'false');
  });
}
