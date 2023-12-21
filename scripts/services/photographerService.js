import { Query } from "../helpers/query.js";
import { Photographer } from "../models/Photographer.js";

export class PhotographerService {
    constructor() {
        this.query = new Query('./data/photographers.json');
    }

    async getPhotographer(id) {
        try {
            const photographers = await this.query.fetch();
            const photographer = photographers.photographers.find(photographer => parseInt(photographer.id) === parseInt(id));

            if (photographer) {
                return new Photographer(photographer);
            } else {
                throw new Error(`Photographer not found.`);
            }
        } catch (error) {
            throw new Error(`Error while fetching photographer: ${error.message}`);
        }
    }
}