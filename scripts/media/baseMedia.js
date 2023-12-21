export class BaseMedia {
    $media;

    constructor(data, photographer) {
        const { title, mediaLink } = data;

        this.$media = this.createMediaElement();

        Object.assign(this.$media, {
            src: mediaLink,
            alt: `${title} by ${photographer.name}`,
        });
    }

    createMediaElement() {
        throw new Error('createMediaElement method must be implemented by subclasses');
    }

    createComponent() {
        this.$media.tabIndex = 0;
        return this.$media;
    }
}
