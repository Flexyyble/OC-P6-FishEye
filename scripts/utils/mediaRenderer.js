import { CardFactory } from '../factories/factoryCard.js';

export class MediaRenderer {
    constructor($mediaWrapper) {
        this.$mediaWrapper = $mediaWrapper;
    }

    async renderMedias(data, photographer) {
        console.log(data);
        this.$mediaWrapper.innerHTML = '';

        data.forEach((media, index) => {
            const cardTemplate = new CardFactory(media, 'media', photographer);
            const card = cardTemplate.createMediaCard();
            this.$mediaWrapper.appendChild(card);

            const mediaSection = card.querySelector('.media-card__media');
            mediaSection.addEventListener('click', () => {
                const lightbox = new Lightbox(data, index, '.lightbox_modal', photographer);
                lightbox.init();
            });

            mediaSection.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    const lightbox = new Lightbox(data, index, '.lightbox_modal', photographer);
                    lightbox.init();
                }
            });
        });
    }
}
