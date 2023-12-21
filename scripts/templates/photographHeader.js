import { createElement } from "../utils/createElement.js";

export class PhotographHeader {
    constructor(data, container) {
        this._data = data;
        this.$container = document.querySelector(container);
    }

    createInformationSection() {
        const { name, location, tagline } = this._data;

        const $informationSection = createElement('article', {
            class: 'photograph-header__information-section',
            'aria-label': 'Informations sur le photographe',
            tabIndex: '0'
        });

        const $photographName = createElement('h1', {
            class: 'photograph-header__name',
            'aria-label': `Nom du photographe : ${name}`,
            innerText: name
        });

        const $photographLocation = createElement('p', {
            class: 'photograph-header__location',
            'aria-label': `Localisation du photographe : ${location}`,
            innerText: location
        });

        const $photographTagline = createElement('p', {
            class: 'photograph-header__tagline',
            'aria-label': `Slogan du photographe : ${tagline}`,
            innerText: tagline
        });

        $informationSection.append($photographName, $photographLocation, $photographTagline);
        return $informationSection;
    }

    createPhotographPortrait() {
        const $portraitWrapper = createElement('div', {
            class: 'photograph-header__portrait-wrapper'
        });

        const $photographPortrait = createElement('img', {
            class: 'photograph-header__portrait',
            'aria-label': `Portrait du photographe : ${this._data.name}`,
            tabIndex: '0',
            alt: `${this._data.name} portrait`,
            src: this._data.portrait
        });

        $portraitWrapper.append($photographPortrait);
        return $portraitWrapper;
    }

    createPhotographHeader() {
        const $informationSection = this.createInformationSection();
        const $photographPortrait = this.createPhotographPortrait();

        this.$container.prepend($informationSection);
        this.$container.append($photographPortrait);
    }
}