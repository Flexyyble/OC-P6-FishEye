// Creates a lightbox button with the given ARIA label, click handler, and optional SVG icon.
export function createLightboxButton(ariaLabel, handler, icon = null, classList = null) {
    const $button = document.createElement('button');
    $button.classList.add(classList);
    $button.setAttribute('aria-label', ariaLabel);

    if (icon) {
        $button.appendChild(icon);
    }

    if (handler) {
        $button.addEventListener('click', handler);
    }

    return $button;
}

// Handle keydown events within the lightbox.
export function handlekeydown(event, lightbox) {

    if (event.key === 'Escape') {
        lightbox.closeLightbox();
    }
    if (event.key === 'ArrowLeft') {
        lightbox.navigate(-1);
    }
    if (event.key === 'ArrowRight') {
        lightbox.navigate(1);
    }

    if (event.key === 'Tab' && event.shiftKey) {
        const focusableElements = lightbox.$lightboxInner.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[0];
        if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            const lastFocusableElement = focusableElements[focusableElements.length - 1];
            lastFocusableElement.focus();
        }
    } else if (event.key === 'Tab') {
        const focusableElements = lightbox.$lightboxInner.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            const firstFocusableElement = focusableElements[0];
            firstFocusableElement.focus();
        }
    }

    if (event.key === 'Enter') {
        const closeButton = lightbox.$lightboxInner.querySelector('.lightbox__close');
        if (document.activeElement === closeButton) {
            lightbox.closeLightbox();
        }
    }
}

// Handle click events on the document.
export function handleDocumentClick(event, lightbox) {
    if (event.target === document.body) {
        lightbox.closeLightbox();
    }
}
