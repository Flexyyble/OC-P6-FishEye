export class Loader {
    constructor() {
        this.loaderContainer = document.getElementById('loader-container');
        document.body.appendChild(this.loaderContainer);
    }

    // Show the loader with a fade-out effect
    show() {
        // Set a timeout to hide the loader and handle opacity transition
        setTimeout(() => {
            this.loaderContainer.style.opacity = '0';

            // Listen for the opacity transition end to hide the loader
            this.loaderContainer.addEventListener('transitionend', this.handleTransitionEnd);
        }, 1300);
    }

    // Handle the opacity transition end to hide the loader
    handleTransitionEnd = (event) => {
        if (event.propertyName === 'opacity' && parseFloat(event.target.style.opacity) === 0) {
            this.loaderContainer.style.display = 'none';

            // Remove the event listener to prevent memory leaks
            this.loaderContainer.removeEventListener('transitionend', this.handleTransitionEnd);
        }
    };
}