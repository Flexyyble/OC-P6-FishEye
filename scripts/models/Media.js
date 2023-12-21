export class Media {
    constructor(data) {
        this._data = data;
    }
    get id() {
        return this._data.id;
    }
    get photographerId() {
        return this._data.photographerId;
    }
    get title() {
        return this._data.title;
    }
    get mediaLink() {
        const { photographerId, image, video } = this._data;
        return `assets/media/${photographerId}/${image || video}`;
    }
    get mediaType() {
        return this._data.image ? 'image' : 'video';
    }
    get likes() {
        return this._data.likes;
    }
    get date() {
        return this._data.date;
    }
    get price() {
        return this._data.price;
    }
}
