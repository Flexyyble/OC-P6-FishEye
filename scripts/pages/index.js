import { Query } from '../helpers/query.js';
import { Loader } from '../components/Loader.js';
import { Photographer } from '../models/Photographer.js';
import { CardFactory } from '../factories/factoryCard.js';

class App {
    constructor() {
        // Initialize the query to fetch photographers' data from the JSON file
        this.query = new Query('./data/photographers.json');

        // Get the section element where photographer cards will be displayed
        this.photographerSection = document.querySelector('.photographer_section');

        // Create an instance of the Loader component for showing a loading spinner
        this.spinnerLoader = new Loader();
    }

    // Fetch photographers' data using the query and return the 'photographers' array
    async getPhotographers() {
        try {
            const data = await this.query.fetch();
            return data.photographers;
        } catch (error) {
            throw new Error(error); // Throw an error if fetching fails
        }
    }

    // Create and return a photographer card based on the provided data
    displayPhotographerCard(photographerData) {
        const photographer = new Photographer(photographerData);
        const cardFactory = new CardFactory(photographer, 'photographer');
        return cardFactory.createCard();
    }

    // Show the loading spinner, fetch photographers' data, and display their cards
    async init() {
        try {
            const photographers = await this.getPhotographers();

            // Batch insertions using a DocumentFragment to minimize repaints
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

// Instantiate the App and initialize its functionality
const app = new App();
app.init();
