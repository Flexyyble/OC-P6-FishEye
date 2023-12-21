import { createElement } from "../utils/createElement.js";
import { MediaFactory } from "../factories/factoryMedia.js";
import { handleLikes } from "../utils/likesHandle.js";

export class MediaCard {
    constructor(media, photographer) {
        this._photographer = photographer;
        this._media = media;
        this._media.isLiked = false;
    }

    createInformationSection() {
        const { likes, title } = this._media;

        const $likes = createElement("p", {
            class: "media-card__likes",
            'aria-label': `Number of likes: ${likes}`,
            tabIndex: "0",
            dataset: {
                likes: likes
            },
            innerText: likes
        });

        const $likesIcon = createElement("i", {
            class: "fas fa-heart media-card__likes-icon",
            tabIndex: "-1",
            ariaHidden: "true"
        });

        const $likeBtn = createElement("button", {
            class: "media-card__like-btn",
            'aria-label': "Click to like the photo",
            tabIndex: "0",
        });
        $likeBtn.append($likesIcon);

        $likeBtn.addEventListener("click", () => {
            handleLikes(this._media, $likes, $likeBtn, $likesIcon, this._photographer);
            const totalLikes = document.querySelector('.photographer-sidebar__likes');
            totalLikes.innerText = `${this._photographer.totalLikes}`;
        });

        const $likeWrapper = createElement("div", {
            class: "media-card__like-wrapper",
            dataset: {
                isLiked: false,
                mediaId: this._media.id
            }
        });
        $likeWrapper.append($likeBtn, $likes);

        const $title = createElement("h2", {
            class: "media-card__title",
            'aria-label': `Photo Title: ${title}`,
            innerText: title,
            tabIndex: "0"
        });

        const $informationSection = createElement("div", {
            class: "media-card__information",
            'aria-label': "More Information",
            tabIndex: "0"
        });
        $informationSection.append($likeWrapper, $title);

        return $informationSection;
    }

    createMediaSection() {
        const $media = MediaFactory.createMedia(this._media, this._photographer).createComponent();

        const $mediaSection = createElement("div", {
            class: "media-card__media",
            'aria-label': `${this._media.title}, closeup view`,
            tabIndex: "0"
        });
        $mediaSection.append($media);

        return $mediaSection;
    }

    createMediaCard() {
        const $mediaCard = createElement("article", {
            class: "media-card",
            'aria-label': "Photo or Video",
            tabIndex: "0"
        });
        $mediaCard.append(this.createMediaSection(), this.createInformationSection());

        return $mediaCard;
    }
}