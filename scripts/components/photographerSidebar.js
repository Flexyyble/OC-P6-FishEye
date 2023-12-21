import { createElement } from '../utils/createElement.js';

export class PhotographerSidebar {
    constructor(photographer, container) {
        this._photographer = photographer;
        this.$container = document.querySelector(container);
    }

    createPhotographerSidebar() {
        const $sidebarContainer = createElement('div', {
            class: 'photographer-sidebar photographer-sidebar--bottom'
        });

        const $likesContainer = createElement('div', {
            class: 'photographer-sidebar__likes-container',
            'aria-label': 'likes',
        });

        const $likesElement = createElement('p', {
            class: 'photographer-sidebar__likes',
            innerText: `${this._photographer.totalLikes} `,
        });

        const $heartIcon = createElement('i', {
            class: 'fas fa-heart',
        });

        const $priceElement = createElement('p', {
            class: 'photographer-sidebar__price',
            innerText: `${this._photographer.price}`,
        });

        $likesContainer.append($heartIcon, $likesElement);
        $sidebarContainer.append($priceElement, $likesContainer);

        this.$container.append($sidebarContainer);

        return $sidebarContainer;
    }
}