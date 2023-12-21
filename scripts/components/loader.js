export class Loader {
    constructor() {
        this.loaderContainer = document.getElementById('loader-container');
        document.body.appendChild(this.loaderContainer);
    }

    show() {
        setTimeout(() => {
            this.loaderContainer.style.opacity = '0';

            this.loaderContainer.addEventListener('transitionend', this.handleTransitionEnd);
        }, 1300);
    }

    handleTransitionEnd = (event) => {
        if (event.propertyName === 'opacity' && parseFloat(event.target.style.opacity) === 0) {
            this.loaderContainer.style.display = 'none';

            this.loaderContainer.removeEventListener('transitionend', this.handleTransitionEnd);
        }
    };
}