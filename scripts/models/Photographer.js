// Class representing photographer data
export class Photographer {
    constructor(data) {
        this._data = data; // Store the photographer data internally
    }

    // Getter for the whole data object
    get data() {
        return this._data;
    }

    // Getter for photographer's name
    get name() {
        return this._data.name;
    }

    // Getter for photographer's portrait path
    get portrait() {
        return `assets/photographers/${this._data.portrait}`;
    }

    // Getter for photographer's ID
    get id() {
        return this._data.id;
    }

    // Getter for photographer's location
    get location() {
        return `${this._data.city}, ${this._data.country}`;
    }

    // Getter for photographer's tagline
    get tagline() {
        return this._data.tagline;
    }

    // Getter for photographer's price
    get price() {
        return `${this._data.price}€ / day`;
    }
}
