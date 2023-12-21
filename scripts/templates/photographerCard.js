import { createElement } from "../utils/createElement.js";

export class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    // Create the wrapper for the card
    getCardWrapper() {
        return createElement('div', {
            class: 'card-photographer',
            tabindex: '0',
            'aria-label': `Photographer ${this._photographer.name}`
        });
    }

    // Create the information section of the card
    createInformationSection() {
        const { location, tagline, price } = this._photographer;

        const informationSection = createElement('div', {
            class: 'card-photographer__information',
            'aria-label': "Plus d'informations",
            tabindex: '0'
        });

        const locationElement = createElement('p', {
            class: 'card-photographer__location',
            'aria-label': 'Ville et Pays',
            innerText: location
        });

        const taglineElement = createElement('p', {
            class: 'card-photographer__tagline',
            'aria-label': 'Tagline',
            innerText: tagline
        });

        const priceElement = createElement('p', {
            class: 'card-photographer__price',
            'aria-label': 'Tarif journalier',
            innerText: price
        });

        informationSection.append(locationElement, taglineElement, priceElement);

        return informationSection;
    }

    // Create the link for the card
    getLink() {
        const link = createElement('a', {
            class: 'card-photographer__link',
            href: `./photographer.html?id=${this._photographer.id}`,
            'aria-label': `Photographer ${this._photographer.name}`,
            tabindex: '0',
            title: `Photographer ${this._photographer.name}`
        });

        const portraitWrapper = createElement('div', {
            class: 'card-photographer__portrait'
        });

        const portraitImage = createElement('img', {
            src: this._photographer.portrait,
            alt: `Portrait de ${this._photographer.name}`
        });

        portraitWrapper.appendChild(portraitImage);
        link.appendChild(portraitWrapper);

        const nameElement = createElement('h2', {
            class: 'card-photographer__name',
            innerText: this._photographer.name
        });

        link.appendChild(nameElement);

        return link;
    }

    // Create the photographer card
    createCard() {
        const cardWrapper = this.getCardWrapper();
        const informationSection = this.createInformationSection();
        const link = this.getLink();

        cardWrapper.append(link, informationSection);
        return cardWrapper;
    }
}
