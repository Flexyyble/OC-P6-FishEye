export class BaseMedia {
    $media;

    constructor(data, photographer) {
        const { title, mediaLink } = data;

        // Create media element based on mediaType (to be implemented by subclasses)
        this.$media = this.createMediaElement();

        // Set common attributes for both image and video
        Object.assign(this.$media, {
            src: mediaLink,
            alt: `${title} by ${photographer.name}`,
        });
    }

    // To be implemented by subclasses
    createMediaElement() {
        throw new Error('createMediaElement method must be implemented by subclasses');
    }

    createComponent() {
        this.$media.tabIndex = 0;
        return this.$media;
    }
}
