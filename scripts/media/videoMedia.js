import { BaseMedia } from './baseMedia.js';

export class VideoMedia extends BaseMedia {
    createMediaElement() {
        const videoElement = document.createElement('video');
        this.configureVideoElement(videoElement);
        return videoElement;
    }

    configureVideoElement(videoElement) {
        Object.assign(videoElement, {
            controls: false,
            autoplay: false,
            disablePictureInPicture: false,
        });
    }
}