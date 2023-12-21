// Class responsible for making HTTP queries and fetching data
export class Query {
    constructor(data) {
        this._data = data; // Data for the query, such as URL or options
    }

    // Asynchronously fetches and returns JSON data from the specified URL or resource
    async fetch() {
        try {
            const response = await fetch(this._data);
            return await response.json();
        } catch (error) {
            throw new Error(error); // Throw an error if fetching fails
        }
    }
}
