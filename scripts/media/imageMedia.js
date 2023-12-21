import { BaseMedia } from './baseMedia.js';
import { createElement } from '../utils/createElement.js';

export class ImageMedia extends BaseMedia {
    createMediaElement() {
        return createElement('img');
    }
}