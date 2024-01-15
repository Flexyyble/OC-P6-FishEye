import { Loader } from '../components/loader.js';
import { PhotographerSidebar } from '../components/photographerSidebar.js';
import { PhotographHeader } from '../templates/photographHeader.js';
import { PhotographerService } from '../services/photographerService.js';
import { MediaService } from '../services/mediaService.js';
import { MediaRenderer } from '../utils/mediaRenderer.js';
import { getURLParams } from '../utils/getURLParams.js';

class App {
    constructor() {
        this._photographer = null;
        this._medias = [];
        this.photographerService = new PhotographerService();
        this.mediaService = new MediaService();
        this.$mediaWrapper = document.querySelector('.media-wrapper');
        this.spinnerLoader = new Loader();
        this.mediaRenderer = new MediaRenderer(this.$mediaWrapper);
        this.params = getURLParams();
    }

    async getData() {
        try {
            this._photographer = await this.photographerService.getPhotographer(this.params.id);
            this._medias = await this.mediaService.getMediasByPhotographerId(this._photographer.id, this._photographer);
        } catch (error) {
            console.error(`App getData : Error fetching data: ${error.message}`);
        }
    }

    async renderPage() {
        document.title = `FishEye - ${this._photographer.name}`;
        const photographHeader = new PhotographHeader(this._photographer, '.photograph-header');
        photographHeader.createPhotographHeader();
        const sidebar = new PhotographerSidebar(this._photographer, '.sidebar-wrapper');
        sidebar.createPhotographerSidebar();
        console.log(this._photographer)
        console.log(this._medias)
        this.mediaRenderer.renderMedias(this._medias.medias, this._photographer);
        document.addEventListener('mediaSorted', (event) => {

            const sortedMedias = event.detail.medias;
            this.mediaRenderer.renderMedias(sortedMedias, this._photographer);
        });
    }

    async init() {
        await this.getData();
        await this.renderPage();
        this.spinnerLoader.show();
    }
}

const app = new App();
app.init();