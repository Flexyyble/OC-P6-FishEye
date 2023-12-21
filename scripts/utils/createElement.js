export const createElement = (tag, options) => {
    const element = document.createElement(tag);

    if (options) {
        for (const key in options) {
            const value = options[key];

            if (key === 'innerText') {
                element.innerText = value;
            } else if (key === 'dataset') {
                for (const dataKey in value) {
                    element.dataset[dataKey] = value[dataKey];
                }
            } else {
                element.setAttribute(key, value);
            }
        }
    }

    return element;
};