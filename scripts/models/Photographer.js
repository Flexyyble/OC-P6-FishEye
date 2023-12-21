export class Photographer {
    constructor(data) {
        this._data = data; 
    }
    get data() {
        return this._data;
    }
    get name() {
        return this._data.name;
    }
    get portrait() {
        return `assets/photographers/${this._data.portrait}`;
    }
    get id() {
        return this._data.id;
    }
    get location() {
        return `${this._data.city}, ${this._data.country}`;
    }
    get tagline() {
        return this._data.tagline;
    }
    get price() {
        return `${this._data.price}€ / day`;
    }
}
