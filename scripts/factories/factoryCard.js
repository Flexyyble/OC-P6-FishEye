import { PhotographerCard } from "../templates/photographerCard.js";
import { MediaCard } from "../templates/mediaCard.js";

export class CardFactory {
    constructor(data, type, photographer) {
        // Store the data and type parameters
        this.data = data;
        this.type = type;
        this.photographer = photographer;

        // Depending on the type, create an instance of the corresponding card
        // This uses a ternary operator to conditionally choose the card type
        switch (this.type) {
            case 'photographer':
                return new PhotographerCard(this.data);
            case 'media':
                return new MediaCard(this.data, this.photographer);
            default:
                throw new Error(`Card type ${this.type} is not supported.`);
        }
    }
}