import { Query } from '../helpers/query.js';
import { Loader } from '../components/loader.js';
import { Photographer } from '../models/Photographer.js';
import { CardFactory } from '../factories/factoryCard.js';

class App {
    constructor() {
        this.query = new Query('./data/photographers.json');
        this.photographerSection = document.querySelector('.photographer_section');
        this.spinnerLoader = new Loader();
    }

    async getPhotographers() {
        try {
            const data = await this.query.fetch();
            return data.photographers;
        } catch (error) {
            throw new Error(error);
        }
    }

    displayPhotographerCard(photographerData) {
        const photographer = new Photographer(photographerData);
        const cardFactory = new CardFactory(photographer, 'photographer');
        return cardFactory.createCard();
    }

    async init() {
        try {
            const photographers = await this.getPhotographers();
            const fragment = document.createDocumentFragment();
            photographers.forEach(photographerData => {
                const card = this.displayPhotographerCard(photographerData);
                fragment.appendChild(card);
            });
            this.photographerSection.appendChild(fragment);
            this.spinnerLoader.show();
        } catch (error) {
            console.error('Error fetching photographers:', error);
        }
    }
}

const app = new App();
app.init();