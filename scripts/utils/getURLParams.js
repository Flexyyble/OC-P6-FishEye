export const getURLParams = () => {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const paramsObject = {};

    for (const [key, value] of params.entries()) {
        paramsObject[key] = value;
    }

    return paramsObject;
}