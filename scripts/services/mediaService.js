import { Query } from '../helpers/query.js';
import { Media } from '../models/Media.js';

export class MediaService {
    constructor() {
        this.query = new Query('./data/photographers.json');
    }

    async getMediasByPhotographerId(photographerId, photographer) {
        try {
            const { media: allMedias } = await this.query.fetch();
            
            const medias = allMedias
                .filter((media) => media.photographerId === photographerId)
                .map((mediaData) => new Media(mediaData));

            const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
            photographer.totalLikes = parseInt(totalLikes);
            photographer.medias = medias;
            
            return photographer;
        } catch (error) {
            throw new Error(`MediaService -> getMediasByPhotographerId: ${error.message}`);
        }
    }
}