import { PhotographerCard } from "../templates/photographerCard.js";
import { MediaCard } from "../templates/mediaCard.js";

export class CardFactory {
    constructor(data, type, photographer) {
        this.data = data;
        this.type = type;
        this.photographer = photographer;

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