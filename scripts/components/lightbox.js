import { createElement } from "../utils/createElement.js";
import { MediaFactory } from "../factories/factoryMedia.js";
import { createLightboxButton, handlekeydown, handleDocumentClick } from "../utils/lightboxUtils.js";

export class Lightbox {
    constructor(medias, index, container, photographer) {
        // Photographer's information, media, index, and container initialization.
        this._photographer = photographer;
        this._medias = medias;
        this._index = index;
        this.$lightboxInner = null;
        this.$container = document.querySelector(container);
        this.eventHandlers = [];

        // Function binding for class methods.
        this.createLightbox = this.createLightbox.bind(this);
        this.updateMediaContent = this.updateMediaContent.bind(this);
        this.navigate = this.navigate.bind(this);
        this.initEventListeners = this.initEventListeners.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);

        this.$lightboxClose = null;
        this.$lightboxPrev = null;
        this.$lightboxNext = null;
    }

    // Create the lightbox structure.
    createLightbox() {
        this.$lightboxInner = createElement('div', {
            class: 'lightbox__inner',
            dataset: {
                index: this._index,
            },
        });

        this.$lightboxClose = createLightboxButton('Close the lightbox', this.closeLightbox, null, 'lightbox__close');
        const $lightboxCloseIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        $lightboxCloseIcon.setAttribute("width", "42");
        $lightboxCloseIcon.setAttribute("height", "42");
        $lightboxCloseIcon.setAttribute("viewBox", "0 0 42 42");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z");
        path.setAttribute("fill", "#901c1c");

        $lightboxCloseIcon.append(path);

        const $lightboxContent = createElement('div', {
            class: 'lightbox__content',
        });

        const $lightboxMedia = createElement('p', {
            class: 'lightbox__caption',
        });

        const $lightboxMediaAndControls = createElement('div', {
            class: 'lightboxMediaAndControls'
        })

        this.$mediaTitle = createElement('p', {
            class: 'lightbox__title',
            innerText: this._medias[this._index].title
        })

        this.$lightboxMediaContent = MediaFactory.createMedia(this._medias[this._index], this._photographer).createComponent();

        this.$lightboxMediaContent.controls = true;

        this.$lightboxPrev = createLightboxButton('Previous caption', () => this.navigate(-1), null, 'lightbox__prev');
        const $lightboxPrevIcon = createElement('i', {
            class: 'fas fa-chevron-left',
        });

        this.$lightboxNext = createLightboxButton('Next caption', () => this.navigate(1), null, 'lightbox__next');
        const $lightboxNextIcon = createElement('i', {
            class: 'fas fa-chevron-right',
        });

        $lightboxMedia.append(this.$lightboxMediaContent);
        this.$lightboxPrev.append($lightboxPrevIcon);
        this.$lightboxNext.append($lightboxNextIcon);
        $lightboxMediaAndControls.append(this.$lightboxPrev, $lightboxMedia, this.$lightboxNext)
        $lightboxContent.append($lightboxMediaAndControls, this.$lightboxClose, this.$mediaTitle);
        this.$lightboxClose.append($lightboxCloseIcon);
        this.$lightboxInner.append($lightboxContent);

        return this.$lightboxInner;
    }

    // Update the content of the lightbox media.
    updateMediaContent() {
        this.$lightboxMediaContent = MediaFactory.createMedia(this._medias[this._index], this._photographer).createComponent();
        this.$lightboxMediaContent.controls = true;

        this.$mediaTitle.innerText = this._medias[this._index].title

        const $lightboxMedia = this.$lightboxInner.querySelector('.lightbox__caption');
        $lightboxMedia.innerHTML = '';
        $lightboxMedia.append(this.$lightboxMediaContent);
    }

    // Navigate to the previous or next media.
    navigate(indexDiff) {
        this._index = (this._index + indexDiff + this._medias.length) % this._medias.length;
        this.updateMediaContent();
    }

    // Initialize event listeners for the lightbox.
    initEventListeners() {
        const lightboxButtons = [
            { element: this.$lightboxClose, event: 'click', handler: this.closeLightbox },
            { element: this.$lightboxPrev, event: 'click', handler: () => this.navigate(-1) },
            { element: this.$lightboxNext, event: 'click', handler: () => this.navigate(1) },
        ];

        lightboxButtons.forEach(({ element, event, handler }) => {
            element.addEventListener(event, handler);
            this.eventHandlers.push({ element, event, handler });
        });

        const focusableElements = this.$lightboxInner.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[1];
        firstFocusableElement.focus();

        document.addEventListener('keydown', (event) => {
            handlekeydown(event, this);
        });

        document.addEventListener('click', (event) => {
            handleDocumentClick(event, this);
        });
    }

    // Close the lightbox.
    closeLightbox() {
        this.$lightboxInner.remove();
        document.body.classList.remove('overlay-active');
        this.removeEventListeners();
    }

    // Remove event listeners when they are no longer needed.
    removeEventListeners() {
        this.eventHandlers.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventHandlers = [];
    }

    // Initialize the lightbox.
    init() {
        this.$lightboxInner = this.createLightbox();
        document.body.classList.add('overlay-active');
        this.$container.appendChild(this.$lightboxInner);
        this.initEventListeners();
    }
}
