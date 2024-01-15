export const sortMedia = (photographer, option) => {
    const medias = photographer.medias; // Access the medias from the Photographer object

    let sortedMedias;

    switch (option) {
        case "popularité":
            // Sort medias by popularity (likes)
            sortedMedias = [...medias].sort((a, b) => b.likes - a.likes);
            break;
        case "date":
            // Sort medias by date
            sortedMedias = [...medias].sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case "titre":
            // Sort medias by title (alphabetically)
            sortedMedias = [...medias].sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // No sorting required, use the original medias order
            sortedMedias = medias;
    }

    // Update the photographer with the sorted medias
    photographer.medias = sortedMedias;

    return photographer; // Return the updated photographer with sorted medias
};
