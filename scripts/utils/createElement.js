export const createElement = (tag, options) => {
    // Create the HTML element with the specified tag.
    const element = document.createElement(tag);

    if (options) {
        // Iterate through the options object to set attributes and properties.
        for (const key in options) {
            const value = options[key];

            if (key === 'innerText') {
                // Set the inner text of the element.
                element.innerText = value;
            } else if (key === 'dataset') {
                // Set dataset attributes.
                for (const dataKey in value) {
                    element.dataset[dataKey] = value[dataKey];
                }
            } else {
                // Set other attributes or properties.
                element.setAttribute(key, value);
            }
        }
    }

    // Return the created HTML element.
    return element;
};