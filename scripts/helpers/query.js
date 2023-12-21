export class Query {
    constructor(data) {
        this._data = data;
    }

    async fetch() {
        try {
            const response = await fetch(this._data);
            return await response.json();
        } catch (error) {
            throw new Error(error);
        }
    }
}
